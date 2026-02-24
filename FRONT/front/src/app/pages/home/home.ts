import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CochesService } from '../../services/coches.service';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Card],
  template: `
    <div class="home-container">
      <section class="hero">
        <h1>Encuentra el coche de tus sueños</h1>
        <p>Explora nuestro catálogo con más de 15 modelos diferentes</p>
      </section>

      <div class="filtros-container">
        <button class="filtro-btn" (click)="cargarCoches()">Todos</button>
        @for (cat of categorias; track cat) {
          <button class="filtro-btn" (click)="filtrarPorCategoria(cat)">
            {{ cat }}
          </button>
        }
      </div>

      @if (loading()) {
        <div class="loading-container">
          <div class="spinner"></div>
          <p>Cargando coches...</p>
        </div>
      }

      @if (!loading() && coches().length > 0) {
        <div class="coches-grid">
          @for (coche of coches(); track coche.id) {
            <app-card [coche]="coche" />
          }
        </div>
      }

      @if (!loading() && coches().length === 0) {
        <div class="no-results">
          <p>No hay coches disponibles</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  private cochesService = inject(CochesService);
  private router = inject(Router);

  coches = signal<any[]>([]);
  loading = signal(true);
  error = signal(false);
  
  categorias = ['SUV', 'Sedan', 'Deportivo', 'Electrico', 'Hatchback'];

  ngOnInit() {
    this.cargarCoches();
  }

  cargarCoches() {
    this.loading.set(true);
    this.cochesService.getAllCoches().subscribe({
      next: (data) => {
        this.coches.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  filtrarPorCategoria(categoria: string) {
    this.router.navigate(['/buscar'], { queryParams: { categoria } });
  }
}