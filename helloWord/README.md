# HelloWord! con la API de JavaScript de ArcGIS
========

Antes de empezar a trabajar con la API de JavaScritp tendremos que crearnos una cuenta gratuita de [developer](https://developers.arcgis.com/sign-up/) para aceptar los términos de uso. Este tipo de [cuenta gratuita](https://esri-es.github.io/licenciamiento-developers/#/desarrollo/README?id=arcgis-developer-plans-adp) incluye las licencias para usar SDKs, APIs, generación de aplicaciones... en entornos de desarrollo y pruebas sin ningún coste y por tiempo ilimitado.

Una vez creada, ya podemos empezar a trabajar en local sobre nuestra aplicación. 

En el ```head``` de nuestro archivo html añadiremos los estilos e importamos la librería de ArcGIS. 

```
  <link rel="stylesheet" href="https://js.arcgis.com/4.17/esri/themes/light/main.css">
  <script src="https://js.arcgis.com/4.17/"></script>
  <script src="index.js" type="text/javascript"></script>

  <link  type="text/css" href="style.css" rel="stylesheet" />
```

En este caso hemos añadido el tema Ligth, aquí puedes ver [más estilos](https://developers.arcgis.com/javascript/latest/guide/styling/). Además, si queremos trabajar con archivos JavaScript y CSS, será ahí donde los añadiremos. (???)

Vamos a aplicar estos estilos para que el mapa ocupe casi toda la pantalla.
style.css
```
html, body, #wrapper-map { 
  padding: 0; 
  margin: 0; 
  height: 85vh; 
  width: 100%; 
}
```

En el script de JavaScript utilizaremos un ```require``` que recibe dos parámetros, un array con las clases que vamos a utilizar y una función a modo de "callback" que recibirá todas las clases en los argumentos.