import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CochesService } from '../../services/coches.service';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [FormsModule, Card],
  template: `
    <div class="busqueda-container">
      <div class="buscador-section">
        <h2>Buscar Coches</h2>
        
        <div class="buscador-form">
          <input
            type="text"
            [(ngModel)]="terminoBusqueda"
            (keyup.enter)="buscar()"
            placeholder="Buscar por marca o modelo..."
            class="buscador-input"
          >
          <button 
            (click)="buscar()" 
            class="buscador-btn"
            [disabled]="!terminoBusqueda.trim()"
          >
            Buscar
          </button>
          @if (terminoBusqueda) {
            <button (click)="limpiarBusqueda()" class="limpiar-btn">
              Limpiar
            </button>
          }
        </div>
      </div>

      @if (loading()) {
        <div class="loading-container">
          <div class="spinner"></div>
          <p>Buscando coches...</p>
        </div>
      }

      @if (error()) {
        <div class="error-container">
          <p class="error-message">{{ mensajeError() }}</p>
        </div>
      }

      @if (!loading() && !error() && coches().length > 0) {
        <div class="coches-grid">
          @for (coche of coches(); track coche.id) {
            <app-card [coche]="coche" />
          }
        </div>
      }

      @if (!loading() && !error() && coches().length === 0 && terminoBusqueda) {
        <div class="no-results">
          <p>No se encontraron coches para "{{ terminoBusqueda }}"</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./busqueda.css']
})
export class Busqueda implements OnInit {
  private cochesService = inject(CochesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  terminoBusqueda: string = '';
  coches = signal<any[]>([]);
  loading = signal(false);
  error = signal(false);
  mensajeError = signal('');

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['categoria']) {
        this.buscarPorCategoria(params['categoria']);
      } else if (params['q']) {
        this.terminoBusqueda = params['q'];
        this.buscar();
      }
    });
  }

  buscar() {
    if (!this.terminoBusqueda.trim()) return;

    this.loading.set(true);
    this.error.set(false);
    
    this.router.navigate([], { 
      queryParams: { q: this.terminoBusqueda },
      queryParamsHandling: 'merge' 
    });

    this.cochesService.searchCoches(this.terminoBusqueda).subscribe({
      next: (data) => {
        this.coches.set(data);
        this.loading.set(false);
        if (data.length === 0) {
          this.mensajeError.set(`No se encontraron coches para "${this.terminoBusqueda}"`);
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.error.set(true);
        this.loading.set(false);
        this.mensajeError.set('Error al realizar la búsqueda');
      }
    });
  }

  buscarPorCategoria(categoria: string) {
    this.loading.set(true);
    this.error.set(false);
    this.terminoBusqueda = categoria;

    this.cochesService.getCochesByCategoria(categoria).subscribe({
      next: (data) => {
        this.coches.set(data);
        this.loading.set(false);
        if (data.length === 0) {
          this.mensajeError.set(`No hay coches en la categoría "${categoria}"`);
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.error.set(true);
        this.loading.set(false);
        this.mensajeError.set('Error al cargar la categoría');
      }
    });
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.coches.set([]);
    this.router.navigate(['/buscar']);
  }
}