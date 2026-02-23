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

  constructor(private cochesService: CochesService) {}

  ngOnInit() {
    console.log('🃏 Card recibió:', this.coche);
    if (this.coche?.imagen) {
      this.imagenUrl = this.cochesService.getImagenUrl(this.coche.imagen);
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