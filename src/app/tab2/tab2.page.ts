import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;

  //Son algunas de las peliculas recomendadas
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'Deadpool'];
  peliculas: Pelicula[] = [];

  constructor(private moviesService: MoviesService,
    private modalCtrl: ModalController) { }



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
