import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})

export class DetalleComponent implements OnInit {

  //Pedir el el id con el Input
  @Input() id;

  //Variables para las funciones
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';

  //Las fotos de los actores
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };


  //constructor con 3 importantes parametros
  constructor(private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService) { }

  ngOnInit() {
    //Si se grega o elimina de favoritos cambia la imagen del icono
    this.dataLocal.existePelicula( this.id ).then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );

    //regresa las detalles de la pelicula seleccionada con el parametro id
    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
      //console.log(resp);
      //console.log(resp);
      this.pelicula = resp;
    });

    //regresa los actores de la pelicula seleccionada con el parametro id
    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {
      //console.log(resp);
      this.actores = resp.cast;
    });
  }

  //Se regresa a la pagina anterior
  regresar() {
    this.modalCtrl.dismiss();
  }

  //guarda o elimina la pelicula en SQLite que se llama dataLocal
  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella = ( existe ) ? 'star' : 'star-outline';
    //para hacer instantaneo el efecto de agrgar o quitar favoritos
  }

}
