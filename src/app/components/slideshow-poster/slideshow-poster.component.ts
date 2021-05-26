import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  //recibe un arreglo de peliculas
  @Input() peliculas: Pelicula[]=[];

  //para las opciones o configuraciones de los slides
  slideOpts={
    slidesPerView: 3.1,
    freeMode: true,
    spaceBetween: -10
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  //para ver detalles
  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });

    //para mostrar la infromacion
    modal.present();
  }

}
