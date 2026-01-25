import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MesureService {
  private apiUrl = 'http://localhost:8080/api/mesures';

  constructor(private http: HttpClient) {}

  getMesures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMesuresGroupees(): Observable<Map<string, any[]>> {
    return this.http.get<Map<string, any[]>>(`${this.apiUrl}/groupees`);
  }
}
