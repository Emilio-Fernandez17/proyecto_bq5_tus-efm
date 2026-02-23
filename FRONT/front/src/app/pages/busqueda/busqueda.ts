import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CochesService } from '../../services/coches.service';
import { Coche } from '../../models/coche.model';
import { Card } from '../../components/card/card';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, FormsModule, Card, Loading],
  templateUrl: './busqueda.html',
  styleUrls: ['./busqueda.css']
})
export class Busqueda implements OnInit {
  terminoBusqueda: string = '';
  coches: Coche[] = [];
  loading = false;
  error = false;
  mensajeError: string = '';

  constructor(
    private cochesService: CochesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    if (!this.terminoBusqueda.trim()) {
      return;
    }

    this.loading = true;
    this.error = false;
    this.router.navigate([], { queryParams: { q: this.terminoBusqueda } });

    this.cochesService.searchCoches(this.terminoBusqueda).subscribe({
      next: (data) => {
        this.coches = data;
        this.loading = false;
        if (data.length === 0) {
          this.mensajeError = 'No se encontraron coches con ese término';
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = true;
        this.loading = false;
        this.mensajeError = 'Error al realizar la búsqueda';
      }
    });
  }

  buscarPorCategoria(categoria: string) {
    this.loading = true;
    this.error = false;

    this.cochesService.getCochesByCategoria(categoria).subscribe({
      next: (data) => {
        this.coches = data;
        this.loading = false;
        this.terminoBusqueda = categoria;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = true;
        this.loading = false;
        this.mensajeError = 'Error al cargar la categoría';
      }
    });
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.coches = [];
    this.router.navigate(['/buscar']);
  }
}