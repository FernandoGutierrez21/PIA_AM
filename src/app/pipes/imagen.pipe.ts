import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

//constante URL para las imagenes
const URL= environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string='w500'): string { //se regresa un string

    //Si no hay imagen entonces pone una imagen por defecto guardada em assets
    if(!img){
      return './assets/no-image-banner.jpg';
    }

    //crea la constante imgUrl y la crea con el URl 
    //de environment.imgPath, el tamaño y la img en los parametros
    const imgUrl=`${URL}/${size}/${img}`;

    return imgUrl;
  }

}
