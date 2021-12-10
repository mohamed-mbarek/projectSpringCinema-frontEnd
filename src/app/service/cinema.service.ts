import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cinema } from '../model/cinema';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient ,private authService:AuthService) { }

  public getCinemas(): Observable<Cinema[]> {
    let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Cinema[]>(`${this.apiServiceUrl}/cinema/all`,{headers:httpHeaders});
  }


  public addCinema(cinema: Cinema): Observable<Cinema> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Cinema>(`${this.apiServiceUrl}/cinema/add`, cinema ,{headers:httpHeaders});
  }

  public Updatecinema(cinema: Cinema): Observable<Cinema> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Cinema>(`${this.apiServiceUrl}/cinema/update`, cinema,{headers:httpHeaders});
  }
  public deletecinema(cinemaId: number): Observable<void> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.delete<void>(`${this.apiServiceUrl}/cinema/delete/${cinemaId}`,{headers:httpHeaders});
  }
}
