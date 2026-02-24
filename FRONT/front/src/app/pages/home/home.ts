import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CochesService } from '../../services/coches.service';
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
  coches: any[] = [];
  loading = true;
  error = false;

  constructor(
    private cochesService: CochesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarCoches();
  }

  cargarCoches() {
    this.loading = true;
    this.cochesService.getAllCoches().subscribe({
      next: (data: any) => {
        console.log('📦 Datos recibidos:', data);

        // ASIGNACIÓN DIRECTA - FORZADA
        this.coches = data;

        console.log('✅ Coches asignados:', this.coches.length);
        this.loading = false;

        // Forzar detección de cambios
        setTimeout(() => { }, 0);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  filtrarPorCategoria(categoria: string) {
    this.router.navigate(['/buscar'], { queryParams: { categoria } });
  }
}