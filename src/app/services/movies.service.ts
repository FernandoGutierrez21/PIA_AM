import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }


  getFeature() {
    //declaramos que el get<RespuestaMDB> para que sepa que nos regrese de tipo RespuestaMDB
    return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31&api_key=196733b839038df32eac306059d1ff28&language=es&include_image_language=es`);

  }

  getPopulares() {
    this.popularesPage++;
    return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}&api_key=196733b839038df32eac306059d1ff28&language=es&include_image_language=es`);
  }

  getPeliculaDetalle(id: string) {
    return this.http.get<PeliculaDetalle>(`https://api.themoviedb.org/3/movie/${id}?a=1&api_key=196733b839038df32eac306059d1ff28&language=es&include_image_language=es`);
  }

  getActoresPelicula(id: string) {
    return this.http.get<RespuestaCredits>(`https://api.themoviedb.org/3/movie/${id}/credits?a=1&api_key=196733b839038df32eac306059d1ff28&language=es&include_image_language=es`);
  }

  buscarPeliculas(texto: string) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${texto}&api_key=196733b839038df32eac306059d1ff28&language=es&include_image_language=es`);

  }


  cargarGeneros() : Promise<Genre[]>{

    //funcion que regresa una promesa, otra forma de hacer promesas
    return new Promise(resolve => {
      this.http.get(`https://api.themoviedb.org/3/genre/movie/list?a=1&api_key=196733b839038df32eac306059d1ff28&language=es&include_image_language=es`)
        .subscribe(resp => {
          this.generos = resp['genres']; //directo del servicipo
          console.log(this.generos);
          resolve(this.generos);
        });
    })


  }

}
