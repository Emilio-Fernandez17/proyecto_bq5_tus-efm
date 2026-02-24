import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coche } from '../models/coche.model';

@Injectable({
  providedIn: 'root'
})
export class CochesService {
  private apiUrl = 'http://localhost:3000/api/coches';
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllCoches(): Observable<Coche[]> {
    return this.http.get<Coche[]>(this.apiUrl);
  }

  getCochesByCategoria(categoria: string): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  searchCoches(term: string): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiUrl}/search?q=${term}`);
  }

  getImagenUrl(imagenRelativa: string): string {
    return `${this.baseUrl}/${imagenRelativa}`;
  }
}