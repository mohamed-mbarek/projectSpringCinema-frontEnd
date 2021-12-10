import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CinemaComponent } from "./composant/cinema/cinema.component";
import { ForbidenComponent } from "./composant/forbiden/forbiden.component";
import { LoginComponent } from "./composant/login/login.component";
import { VilleComponent } from "./composant/ville/ville.component";
import { SecurityGuard } from "./security.guard";


const appRoutes:Routes=[
    {path :'',component:LoginComponent},
    {path :'ville',component:VilleComponent ,canActivate:[SecurityGuard]},
    {path :'cinema',component:CinemaComponent,canActivate:[SecurityGuard] },
    {path :'login',component:LoginComponent},
    {path :'app-forbiden',component:ForbidenComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports :[RouterModule]
    })
    export class AppRoutingModule{
    
    }