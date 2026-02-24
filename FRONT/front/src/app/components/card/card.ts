import { Component, input, signal, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';  // ✅ IMPORTAR EL PIPE
import { CochesService } from '../../services/coches.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe],  // ✅ AÑADIR A IMPORTS
  template: `
    <div class="coche-card">
      <div class="card-image">
        <img [src]="imagenUrl()" 
             [alt]="coche().marca + ' ' + coche().modelo"
             (error)="imagenUrl.set('https://via.placeholder.com/300x200?text=Sin+imagen')">
      </div>
      
      <div class="card-content">
        <h3>{{ coche().marca }} {{ coche().modelo }}</h3>
        <p class="categoria">{{ coche().categoria }}</p>
        <p class="precio">{{ coche().precio | currency:'EUR':'symbol':'1.0-0' }}</p>
        <button class="btn-ver-mas" (click)="abrirModal()">Ver más</button>
      </div>
    </div>

    @if (mostrarModal()) {
      <div class="modal-overlay" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="cerrarModal()">&times;</button>
          
          <div class="modal-grid">
            <div class="modal-image">
              <img [src]="imagenUrl()" [alt]="coche().marca + ' ' + coche().modelo">
            </div>
            
            <div class="modal-info">
              <h2>{{ coche().marca }} {{ coche().modelo }}</h2>
              
              <div class="detalles-grid">
                @for (item of detalles(); track item.label) {
                  <div class="detalle">
                    <span class="detalle-label">{{ item.label }}</span>
                    <span class="detalle-valor">{{ item.valor }}</span>
                  </div>
                }
              </div>
              
              <div class="descripcion">
                <h3>Descripción</h3>
                <p>{{ coche().descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./card.css']
})
export class Card implements OnInit {
  coche = input.required<any>();
  private cochesService = inject(CochesService);
  
  imagenUrl = signal('');
  mostrarModal = signal(false);
  detalles = signal<any[]>([]);

  ngOnInit() {
    const c = this.coche();
    if (c?.imagen) {
      this.imagenUrl.set(this.cochesService.getImagenUrl(c.imagen));
    }
    
    this.detalles.set([
      { label: 'Categoría', valor: c.categoria },
      { label: 'Año', valor: c.anio },
      { label: 'Precio', valor: c.precio },  // ✅ SIN pipe aquí
      { label: 'Motor', valor: c.motor },
      { label: 'Potencia', valor: c.potencia + ' CV' },
      { label: 'Combustible', valor: c.combustible },
      { label: 'Transmisión', valor: c.transmision }
    ]);
  }

  abrirModal() {
    this.mostrarModal.set(true);
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.mostrarModal.set(false);
    document.body.style.overflow = 'auto';
  }
}