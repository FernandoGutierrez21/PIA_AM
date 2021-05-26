import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

  //any de algun
  transform( arr: any[] ): any[] {

    //pares es una constante que recibe 4 parametros
    const pares = arr.reduce( (result, value, index, array) => {

      //si el indice se puede dividir en 2 entonces lanza pares en los slides
      if ( index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }

      return result;
    }, []);

    //rotorna el resultado de pares
    return pares;
 }

}
