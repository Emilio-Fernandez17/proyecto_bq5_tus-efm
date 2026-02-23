import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CochesService } from '../../services/coches.service';
import { Coche } from '../../models/coche.model';
import { Card } from '../../components/card/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  coches: Coche[] = [];
  loading = true;
  error = false;
  errorMessage = '';

  constructor(
    private cochesService: CochesService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🏠 Home iniciado');
    this.cargarCoches();
  }

  cargarCoches() {
    console.log('🔄 Cargando coches...');
    this.loading = true;
    this.error = false;
    
    this.cochesService.getAllCoches().subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos:', data.length);
        this.coches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.error = true;
        this.errorMessage = err.message || 'Error al cargar los coches';
        this.loading = false;
      }
    });
  }

  filtrarPorCategoria(categoria: string) {
    console.log('🔍 Filtrando por:', categoria);
    this.router.navigate(['/buscar'], { queryParams: { categoria } });
  }

  recargar() {
    console.log('🔄 Recargando...');
    this.cargarCoches();
  }
}