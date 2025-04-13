import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private baseUrl = environment.urlServidor;
  private http = inject(HttpClient);

  funListar(page = 1, limit = 10, q = '') {
    return this.http.get(`${this.baseUrl}/producto/back?page=${page}&limit=${limit}&q=${q}`)

  }
}
