import { GeneratedFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

////////////////////////////////////////////////////
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
////////////////////////////////////////////////////

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  ////////////////////////////////////////////////////
  mainForm: FormGroup;
  Data: any[] = []
////////////////////////////////////////////////////

////////////////////////////////////////////////////
  constructor(private dataLocal: DataLocalService,
    private moviesService: MoviesService,
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router) { }
    ////////////////////////////////////////////////////


////////////////////////////////////////////////////
ngOnInit() {
  this.db.dbState().subscribe((res) => {
    if (res) {
      this.db.fetchFavoritos().subscribe(item => {
        this.Data = item
      })
    }
  });

  this.mainForm = this.formBuilder.group({
    pelicula: ['']
  })
}

storeData() {
  this.db.addFavoritos(
    this.mainForm.value.pelicula,
  ).then((res) => {
    this.mainForm.reset();
  })
}

deleteSong(id: any) {
  this.db.deleteFavorito(id).then(async (res) => {
    let toast = await this.toast.create({
      message: 'Favorito eliminado',
      duration: 1500
    });
    toast.present();
  })
}
////////////////////////////////////////////////////

  //muestra las peliculas por genero
  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero(this.generos, this.peliculas);
  }


  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {

    //puede ser que actualice por eso es vacío
    this.favoritoGenero = [];

    //barrer cada uno de los generos del arreglo con el ForEach
    generos.forEach(genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        //retornar un nuevo arreglo que cumplan la condicion
        pelis: peliculas.filter(peli => {
          //verificamos si el genero id es igual al del arrglo id del genero
          return peli.genres.find(genre => genre.id === genero.id);
        })
      });

    });
    //console.log(this.favoritoGenero);

  }

}
