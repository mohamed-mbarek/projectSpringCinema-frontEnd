import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectSpringCinema';
 
  constructor(public authService:AuthService,private router:Router){}

  ngOnInit(): void {
    let isloggedin:string;
    let loggedUser:string;
    isloggedin=localStorage.getItem('isloggedIn');
    loggedUser=localStorage.getItem('loggedUser');
    if(isloggedin!="true"||!loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);   
  }
 
}
