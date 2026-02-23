import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrls: ['./alert.css']
})
export class Alert {
  mensaje: string = '';
  tipo: 'success' | 'error' | 'warning' | 'info' = 'info';
  visible: boolean = false;

  mostrar(mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, 5000);
  }

  cerrar() {
    this.visible = false;
  }
}