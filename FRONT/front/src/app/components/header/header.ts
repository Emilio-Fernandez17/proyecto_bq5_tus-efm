import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  menuAbierto = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  navegar(ruta: string, event?: Event) {
    if (event) event.preventDefault();
    this.cerrarMenu();
    this.router.navigate([ruta]);
  }

  buscarPorCategoria(categoria: string, event: Event) {
    event.preventDefault();
    this.cerrarMenu();
    this.router.navigate(['/buscar'], { queryParams: { categoria } });
  }
}