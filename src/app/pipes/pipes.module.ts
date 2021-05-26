import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';



@NgModule({
  declarations: [
    ImagenPipe, //Para usarlo en pipes
    ParesPipe
  ],
  exports:[
    ImagenPipe, //para exportarlo desde pipes hacia otro componente o servicio
    ParesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
