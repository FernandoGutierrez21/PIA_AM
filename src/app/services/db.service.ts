import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  favList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchFavoritos(): Observable<Favorito[]> {
    return this.favList.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/fav.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getFavoritos();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getFavoritos() {
    return this.storage.executeSql('SELECT * FROM favorito', []).then(res => {
      let items: Favorito[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre_pelicula: res.rows.item(i).artist_name
          });
        }
      }
      this.favList.next(items);
    });
  }

  // Add
  addFavoritos(nombre_pelicula) {
    let data = [nombre_pelicula];
    return this.storage.executeSql('INSERT INTO favorito (nombre_pelicula) VALUES (?)', data)
      .then(res => {
        this.getFavoritos();
      });
  }

  // Get single object
  getFavorito(id): Promise<Favorito> {
    return this.storage.executeSql('SELECT * FROM favorito WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        nombre_pelicula: res.rows.item(0).artist_name
      }
    });
  }

  // Update
  updateSong(id, favorito: Favorito) {
    let data = [favorito.nombre_pelicula];
    return this.storage.executeSql(`UPDATE favorito SET nombre_pelicula = ? WHERE id = ${id}`, data)
      .then(data => {
        this.getFavoritos();
      })
  }

  // Delete
  deleteFavorito(id) {
    return this.storage.executeSql('DELETE FROM favorito WHERE id = ?', [id])
      .then(_ => {
        this.getFavoritos();
      });
  }


}

export class Favorito {
  id: number;
  nombre_pelicula: string;
}
