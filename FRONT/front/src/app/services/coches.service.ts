import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coche } from '../models/coche.model';

@Injectable({
  providedIn: 'root'
})
export class CochesService {
  // IMPORTANTE: Esta URL debe coincidir con tu backend
  private apiUrl = 'http://localhost:3000/api/coches';
  private baseImagenes = 'http://localhost:3000/';  // Sin /img/ para construir después

  constructor(private http: HttpClient) { }

  getAllCoches(): Observable<Coche[]> {
    console.log('🌐 Llamando a API:', this.apiUrl);
    return this.http.get<Coche[]>(this.apiUrl);
  }

  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categorias`);
  }

  getCochesByCategoria(categoria: string): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  searchCoches(term: string): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiUrl}/search?q=${term}`);
  }

  getImagenUrl(imagenRelativa: string): string {
    // Si la imagen viene como "img/toyota-rav4.jpg"
    const url = this.baseImagenes + imagenRelativa;
    console.log('🖼️ URL imagen:', url);
    return url;
  }
}