import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ville } from 'src/app/model/ville';
import { AuthService } from 'src/app/service/auth.service';
import { VilleService } from 'src/app/service/ville.service';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  public villes: Ville[] ;
  public editVille: Ville ;
  public deleteVilleid: Ville ;
  public aletSuccess: boolean ;
  public aletEroor: boolean ;
  public message: string ;

  constructor(private villeService:VilleService ,public authService:AuthService) { }

  ngOnInit(): void {
  this.getAllVilles();
  setTimeout(() => {                           //<<<---using ()=> syntax
    this.aletSuccess = false;
  }, 5000);
  setTimeout(() => {                           //<<<---using ()=> syntax
    this.aletEroor = false;
  }, 5000);

}

  
  public getAllVilles(): void {
    this.villeService.getVilles().subscribe(
      (response: Ville[]) => {
        this.villes = response;
      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' de récupérer les données ';

      });

  }


  public onAddVille(addForm: NgForm): void {

    document.getElementById('add-ville-form')?.click();
    this.villeService.addVille(addForm.value).subscribe(
      (responce: Ville) => {
        console.log(responce);
        this.getAllVilles();
        addForm.reset();
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = ' Ville ajouter avec succès';

      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' aucune ville ajouter réessayer une autre fois';
        addForm.reset();
      },

    );

  }


  public onUpdateVille(ville: Ville): void {
    console.log(ville);
    document.getElementById('fermer-ville').click();
    this.villeService.UpdateVille(ville).subscribe(
      (responce: Ville) => {
        console.log(responce);
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = 'Ville modifié avec succès ';
      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' Aucune modification effectuée ';
      },

    );
  }
  public onDeleteVille(idVille: number) {
    document.getElementById('add-ville-form').click();
    console.log(idVille);
    this.villeService.deleteVille(idVille).subscribe(
      (responce: void) => {
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = 'Ville supprimer avec succès ';

      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' Aucune suppression effectuée ';

      },

    );
  }
  
  public onOpenModal(ville: Ville, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addVilleModel');
    }
    if (mode === 'edit') {
      this.editVille = ville;
      console.log(this.editVille);      button.setAttribute('data-target', '#updateVilleModal');
    }
    if (mode === 'delete') {
      this.deleteVilleid = ville;
      console.log(this.deleteVilleid)
      button.setAttribute('data-target', '#deleteVilleModal');
    }
    container.appendChild(button);
    button.click();
  }

  public searchVille(key: string): void {
    const resultat: Ville[] = [];
    for (const v of this.villes) {
      if (v.nom.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1)
        resultat.push(v);
    }
    this.villes = resultat;
  }

}
