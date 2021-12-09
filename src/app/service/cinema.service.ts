import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cinema } from '../model/cinema';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${this.apiServiceUrl}/cinema/all`);
  }


  public addCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(`${this.apiServiceUrl}/cinema/add`, cinema);
  }
  public Updatecinema(cinema: Cinema): Observable<Cinema> {
    return this.http.put<Cinema>(`${this.apiServiceUrl}/cinema/update`, cinema);
  }
  public deletecinema(cinemaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/cinema/delete/${cinemaId}`);
  }
}
