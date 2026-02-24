import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Coche } from '../../models/coche.model';
import { CochesService } from '../../services/coches.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card implements OnInit {
  @Input() coche!: Coche;
  imagenUrl: string = '';
  mostrarModal = false;

  constructor(private cochesService: CochesService) {
    console.log('🟢 Card constructor');
  }

  ngOnInit() {
    console.log('🟣 Datos del coche en Card:', JSON.stringify(this.coche, null, 2));
    
    // Verificar que los datos existen
    if (this.coche) {
      console.log('🟣 Marca:', this.coche.marca);
      console.log('🟣 Modelo:', this.coche.modelo);
      
      // Construir URL de imagen
      if (this.coche.imagen) {
        this.imagenUrl = this.cochesService.getImagenUrl(this.coche.imagen);
        console.log('🟣 URL imagen:', this.imagenUrl);
      }
    } else {
      console.error('🔴 ERROR: coche es undefined');
    }
  }

  abrirModal() {
    this.mostrarModal = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.mostrarModal = false;
    document.body.style.overflow = 'auto';
  }
}