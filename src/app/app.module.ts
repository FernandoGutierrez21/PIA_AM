import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//usando el HttpClient
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

////////////////////////////////////////////////////
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
////////////////////////////////////////////////////

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, //ROUTING
    HttpClientModule, //HTTPCLIENT
    IonicStorageModule.forRoot() //PARA QUE TENGA ACCESO
  ], //Importando el HttpClient
  ////////////////////////////////////////////////////
  providers: [
    SQLite,
    SQLitePorter,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }
  ],
  ////////////////////////////////////////////////////
  bootstrap: [AppComponent],
})
export class AppModule {}
