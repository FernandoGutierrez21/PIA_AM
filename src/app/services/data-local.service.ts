import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
//import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})


//CONEXION CON SQLite

export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
    private toastCtrl: ToastController) {
    //para que se carguen los favoritos sin tener que actualizar
    this.cargarFavoritos();
  }

  //presenta el mensjae en la parte inferior como un pequeño aviso
  //recbiendo como parametro lo que va a decir
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  //guarda o elimina las peliculas en favoritos
  guardarPelicula(pelicula: PeliculaDetalle) {
    //se inicializa la bandera existe con false porque al principio no esta en favoritos
    let existe = false;

    //El mensaje esta vacío
    let mensaje = '';

    //cliclo para la validacion de que si la pelicula ya esta en favoritos
    //y no se vuelva a añadir la misma pelicula
    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    //condicional para mostrar el mensaje segun la existenia en favoritos
    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast(mensaje);

    //se guarda en SQLlite
    this.storage.set('peliculas', this.peliculas);

    //si existía lo elimina y sino la añade
    return !existe;
  }

  //carga la pagina de favoritos con los nuevos cambios
  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');//peliculas lo saca de la base de datos
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  //es una promesa y sirve que oara que si el id ya esta guardado entonces no lo guarde más
  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true : false;
  }


}
