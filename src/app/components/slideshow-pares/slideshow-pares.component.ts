import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {


  //Recibe un arreglo de peliculas
  @Input() peliculas: Pelicula[] = [];

  //Da más peliculas
  @Output() cargarMas = new EventEmitter();

  slideOpts={
    slidesPerView: 3.1,
    freeMode: true,
    spaceBetween: -10
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  //carga más peliculas de populares
  onClick(){
    this.cargarMas.emit();
  }

  //Es para ver detalles
  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });

    modal.present();
  }

  

}
