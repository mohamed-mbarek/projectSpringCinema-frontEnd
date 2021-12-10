import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ville } from '../model/ville';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private apiServiceUrl=environment.apiBaseUrl;
//  public villes:Observable<Ville[]>;

constructor(private http:HttpClient ,private authService:AuthService){}


public getVilles(): Observable<Ville[]>{
  let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.get<Ville[]>(`${this.apiServiceUrl}/ville/all`,{headers:httpHeaders});
}
public addVille(ville :Ville):Observable<Ville>{
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
return  this.http.post<Ville>(`${this.apiServiceUrl}/ville/add`,ville,{headers:httpHeaders});
}
public UpdateVille(ville :Ville):Observable<Ville>{
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
return  this.http.put<Ville>(`${this.apiServiceUrl}/ville/update`,ville,{headers:httpHeaders});
}
public deleteVille(villeId:number):Observable<void>{
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
return  this.http.delete<void>(`${this.apiServiceUrl}/ville/delete/${villeId}`,{headers:httpHeaders});

}
}
