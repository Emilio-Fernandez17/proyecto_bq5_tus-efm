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
  ) {}

  ngOnInit() {
    this.cargarCoches();
  }

  cargarCoches() {
    this.loading = true;
    this.cochesService.getAllCoches().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.coches = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          this.coches = data.data;
        } else if (data && data.rows && Array.isArray(data.rows)) {
          this.coches = data.rows;
        } else {
          this.coches = [];
        }
        this.loading = false;
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