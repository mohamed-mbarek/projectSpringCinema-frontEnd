import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cinema } from 'src/app/model/cinema';
import { Ville } from 'src/app/model/ville';
import { CinemaService } from 'src/app/service/cinema.service';
import { VilleService } from 'src/app/service/ville.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public villes: Ville[];
  public cinemas: Cinema[];
  public editCinema: Cinema;
  public deleteCinema: Cinema;
  public ville: Ville;
  aletSuccess: boolean;
  aletEroor: boolean;
  message: string;
  constructor(private cinemaService:CinemaService,private villeService:VilleService) { }

  ngOnInit(): void {
    this.getAllVilles();
    this.getAllCinemas();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 5000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 5000);
  
  }
  public getAllCinemas(): void {
    this.cinemaService.getCinemas().subscribe(
      (response: Cinema[]) => {
        this.cinemas = response;
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message='  Ne peut pas obtenir la liste des cinémas .';  
 });

  }

  
  public getAllVilles(): void {
    this.villeService.getVilles().subscribe(
      (response: Ville[]) => {
        this.villes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });

  }

  public onAddCinema(addForm: NgForm): void {

    document.getElementById('add-cinema-form').click();
      console.log(addForm.value);
    const values = addForm.value;
    let cinema: Cinema = {
      adress: values.adress,
      description: values.description,
      image: values.image,
      nom: values.nom,
      nombreSalles: values.nombreSalles,
      ville: {
        idVille: values.ville
      }
    };
    console.log(cinema); 
    this.cinemaService.addCinema(cinema).subscribe(
      (responce: Cinema) => {
        this.aletSuccess=true;
        this.message='Cinéma ajouter avec succès '; 
        addForm.reset();
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' aucun cinéma ajouter réessayer une autre fois';  
        addForm.reset();
      },

    );

  }

  public searchCinema(key: string): void {
    console.log(key);
    const resultat: Cinema[] = [];
    for (const v of this.cinemas) {
      if (v.nom.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1)
        resultat.push(v);
    }
    this.cinemas = resultat;
  }

  public onDeleteCinema(idCinema: number) {
    document.getElementById('delete-form').click();
    this.cinemaService.deletecinema(idCinema).subscribe(
      (responce: void) => {
        this.getAllVilles;
        this.ngOnInit();
        this.aletSuccess=true;
        this.message='Cinéma supprimer avec succès ';  

      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' Aucune suppression effectuée '; 
      },

    );
  }


  public onUpdateCinema(editForm: NgForm): void {
    document.getElementById('fermer-cinema-form').click();
    const values = editForm.value;
    let editCinema: Cinema = {
      id: values.id,
      adress: values.adress,
      description: values.description,
      image: values.image,
      nom: values.nom,
      nombreSalles: values.nombreSalles,
      ville: {
        idVille: values.ville
      }
    };
    console.log(editCinema);
    this.cinemaService.Updatecinema(editCinema).subscribe(
      (responce: Cinema) => {
        this.aletSuccess=true;
        this.message='Categorie modifier avec succès ';  
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' Aucune modification effectuée ';  
      },

    );
  }

  public onOpenModal(cinema: Cinema, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCinemaModel');

    }
    if (mode === 'edit') {
      this.editCinema = cinema;
      button.setAttribute('data-target', '#updateCinemaModal');
    }
    if (mode === 'delete') {
      this.deleteCinema = cinema;
      button.setAttribute('data-target', '#deleteCinemaModal');
    }
    container.appendChild(button);
    button.click();
  }


}
