import { Component, OnInit } from '@angular/core';
import {  Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[]=[];
  populares: Pelicula[]=[];
  peliculas: Pelicula[] = [];


  textoBuscar = '';
  buscando = false;


  constructor(private moviesService: MoviesService,
    private modalCtrl: ModalController) {}

  ngOnInit() {
    //nos muestra los arreglos que en este caso son peliculas
    this.moviesService.getFeature().subscribe(resp => {
      this.peliculasRecientes=resp.results;
    });

    this.getPopulares();
  }

  //carga más peliculas titulares con el boton
  cargarMas() {
    this.getPopulares();
  }

  //obtiene las peliculas titulares
  getPopulares() {
    this.moviesService.getPopulares()
    .subscribe( resp => {
      // arreglos semi temporal, que nos da peliculas populares
      // y muestra en consola que nos dio tal resultado
      const arrTemp = [ ...this.populares, ...resp.results ];
      this.populares = arrTemp;

    });
  }

//El evento buscar
buscar(event) {
  const valor: string = event.detail.value;

  //si la cadena es vacía entonces no busca y regresa las peliculas recomendadas
  if (valor.length === 0) {
    this.buscando = false;
    this.peliculas = [];
    return;
  }

  this.buscando = true;

  //busca las peliculas
  this.moviesService.buscarPeliculas(valor)
    .subscribe(resp => {
      console.log(resp);
      this.peliculas = resp['results'];
      this.buscando = false;
    });
}

//muestra los detalels de la pelicula segun du id
async detalle(id: string) {
  const modal = await this.modalCtrl.create({
    component: DetalleComponent,
    componentProps: {
      id
    }
  });

  modal.present();
}

}
