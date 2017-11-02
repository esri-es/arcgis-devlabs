JavascriptAPI
=============

Toda la documentación y [ejemplos](http://esri-es.github.io/JavascriptAPI) de este repositorio se han creado usando la [API Javascript de ArcGIS](https://developers.arcgis.com/javascript/).

Si quieres saber dónde encontrar datos para hacer tus proyectos o tienes dudas puedes unirte al grupo de [Geo Developers](http://meetup.com/Geo-Developers/) y preguntar a través de [la lista de correo](http://www.meetup.com/Geo-Developers/messages/archive/).

Si nunca antes has trabajado con esta plataforma (Github), aquí tienes un [curso práctico en vídeo y gratuito sobre Git](https://www.codeschool.com/courses/try-git) ^_^. Nota: *se hace en un par de horas*

Configura tu entorno en local
---------------

1. [Descarga e instala GIT](http://git-scm.com/downloads)

2. Clona el repositorio, tienes dos opciones

  2.1 [Usando la línea de comandos](http://git-scm.com/book/en/Git-Basics-Getting-a-Git-Repository) (para usuarios avanzados)

  2.2 Haciendo clic en Clone in Desktop

  <img src="https://github-images.s3.amazonaws.com/help/repository/remotes-url.png">

  2.3 Para poder ejecutar correctamente los ejemplos necesitarás un servidor de páginas estáticas. Te recomendamos [Node.js](http://nodejs.org/) + [http-server](https://www.npmjs.org/package/http-server)

Introducción al desarrollo GIS
---------------
Después de jugar un poco con los tutoriales, vamos a ver cómo resolver problemas complejos usando GIS. Para ello tendremos que ir aprendiendo conceptos, formatos y vocabulario para no volvernos locos.

* [Geocodificación](#geocodificacin)
* [Direcciones](#direcciones)

### Geocodificación
La geocodificación hace referencia a la posibilidad de traducir una o varias direcciones a sus respectivas coodernadas y viceversa.

<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/geocodificacion.png" />&nbsp;
<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/geocoding.png" />&nbsp;
<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/locator_suffix.png" />

La clase utilizada para hacer geocodificación en la API es **Locator** ([Ver documentación](http://bit.ly/RlGn5I)).

*Para aquellos que tengan una organización propia en ArcGIS Online y un servicio REST pueden configurar la clase Locator para que las peticiones se hagan a esta organización.*

**Limite mensual gratuito:**

* **Geosearch**: hacer una búsqueda de una dirección y pintar dónde está (gratuito).
* **Geocoding**: hacer búsquedas masivas y *poder almacenar localmente los datos* de latitud/longitud ([**máximo 1.250 geocodificaciones al mes**](http://bit.ly/1n8JESE)).

Otros datos de interés:

* [**Ejemplos de uso de la geocodificación**](http://bit.ly/1eqqbKs)

<hr class="clear:both">
### Direcciones
El servicio de direcciones te permita crear rutas que pasen por múltiples puntos pudiendo crear rutas optimizadas (incluyendo variables como el tráfico) o determinar el lugar más cercano a una serie de puntos varios puntos

<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/mobile_findnearby.png" />&nbsp;
<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/route_barriers.png" />&nbsp;
<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/route_directions.png" />&nbsp;

La clase utilizada para hacer cálculos de direcciones es **RouteTask** ([Ver documentación](http://bit.ly/1kWUvzw)).

**Limite mensual gratuito:**

* **Direcciones simples**: realizar cálculos entre dos puntos ([**máximo 1.250 al mes**](http://bit.ly/1n8JESE)).
* **Direcciones optimizadas**: calcular la ruta optimizada entre N puntos ([**máximo 100 al mes**](http://bit.ly/1n8JESE)).
* **Lugar más cercano**: calcular el lugar más cercano a N puntos ([**máximo 100 al mes**](http://bit.ly/1n8JESE)).
* **Tiempo de conducción** (isocrona): calcular el área máxima que podrías cubrir en coche en N minutos desde un punto ([**máximo 100 al mes**](http://bit.ly/1n8JESE)).

Otros datos de interés:

* [**Ejemplos que usar cálculos de direcciones**](http://bit.ly/1m54Gl6)
