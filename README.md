# PIA_AM
FERNANDO YAHIR GUTIERREZ SANTOYO 1917844

# Explicación a profesor

Es una aplicación de películas con favoritos y buscar peliculas,
Aplicacion creada a contra reloj ya que el equipo en en que me encontraba dejo de contestar mensajes y 
decidí separarme de ellos ya que no iban a ayudar, ellos se quedaron con la idea original que era un 
aplicación de carros, la verdad no sé si también se separaron o no, así que decidí hacer esta aplicacion 
para no reprobar.

## Instalaciones Necesarias
* [Google Chrome](https://www.google.com/chrome/)

* [Visual Studio Code](https://code.visualstudio.com/)

* [Git](https://git-scm.com/)
```
git config --global user.name "Tu nombre"
git config --global user.email "Tu correo"
```

* [Node](https://nodejs.org/es/)

* [Android Studio](https://developer.android.com/studio/?gclid=Cj0KCQjwhb36BRCfARIsAKcXh6GRXJN_hJrabNpOE94384hWx1uh4qPgqVQBiZJMkDEcNUgTQf3UwZoaAr-ZEALw_wcB&gclsrc=aw.ds)

* [AngularCLI](https://cli.angular.io/)

* [ionic framework](https://ionicframework.com/)

# Descargar Ionic y Angular
Abrir la consola del sistema como administrador para asegurarse que los scrips sean instalados correctamente
ejecutar lo siguientes comandos en cualquier orden pero seguidos:
```
npm install -g @ionic/cli
npm install -g @angular/cli
```

# Procesos para la instalacion

Después de descargar el proyecto del repositorio
y querer correrlo, tenemos que inyectar el siguiente código en la consola con la dirección de la aplicación
```
npm install
```

Si le llega a fallar en algún punto y piensa que son los comandos que no tiene
y desea ejecutar todos de una vez, son los siguientes:
(Por orden con la dirección de la aplicación)
```
ionic build
ionic capacitor add android "o" ionic cordova prepare android
ionic capacitor copy android
```

Para ejecutal el proyecto solo es el comando en la consola con la dirección en los archos de la app:
```
ionic serve
```
