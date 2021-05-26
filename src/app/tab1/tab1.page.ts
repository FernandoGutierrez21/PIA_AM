import { Component, OnInit } from '@angular/core';
import {  Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[]=[];
  populares: Pelicula[]=[];


  constructor(private moviesService: MoviesService) {}

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
}
