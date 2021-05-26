import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

//constantes que utilizaresmos para nuestros https
const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  //Contador
  private popularesPage = 0;

  //variable generos de tipo de la interfaz Genre que nos devuelve los generos
  generos: Genre[] = [];

  //USO DE HttpClient
  constructor(private http: HttpClient) { }


  //Ejecutar el http en el que irá, nos crea la direccion
  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    //Retorna el query hecho con el parametro T que es de las interfaces
    return this.http.get<T>(query);
  }

  //obtiene populares y nos puede dar más populares con la funcion del boton
  getPopulares() {
    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  //busca las peliculas dependiendo del texto que ponga el usuario
  buscarPeliculas(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }



  getFeature() {
    //logica para la creacion y verificaciond e las fechas
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    //bandera
    let mesString;

    //validacion de los meses
    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    //declaramos el inico y el fin de un mes
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  //obtiene los detalles de la pelicula base a su id
  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  //obtienes los actores de cierta pelicula segun su id
  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  //refresca los generos devolviendo una promesa | es como el ansyc pero descrito de otra forma
  cargarGeneros(): Promise<Genre[]> {
    return new Promise(resolve => {

      this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe(resp => {
          this.generos = resp['genres'];
          console.log(this.generos);
          resolve(this.generos);
        });
    });
  }
}
