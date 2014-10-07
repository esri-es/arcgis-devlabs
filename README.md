JavascriptAPI
=============

Toda la documentación y ejemplos de este repositorio se han creado usando la [API Javascript de ArcGIS](https://developers.arcgis.com/javascript/).

Si quieres saber dónde encontrar datos para hacer tus proyectos o tienes dudas puedes unirte al grupo de [Geo Developers](http://meetup.com/Geo-Developers/) y preguntar a través de [la lista de correo](http://www.meetup.com/Geo-Developers/messages/archive/).

Tutoriales
---------------

* Cómo pintar un mapa con el API JS de ArcGIS - 
[Código](http://bit.ly/Qn55l8) | 
[Jugar](http://bit.ly/1iTEPWO) | 
[Previsualizar](http://bit.ly/P2B5Kl)

* Usar el widget de Geocodificación y personalizar el diseño - 
[Código](http://bit.ly/1hHmyk6) | 
[Jugar](http://bit.ly/1p6jFgS) | 
[Previsualizar](http://bit.ly/1hI0aHr)

* Cargar datos desde CSV externos
[Código](http://bit.ly/1eu045l) | 
[Jugar](http://bit.ly/1jHY7S3) | 
[Previsualizar](http://bit.ly/1eEiYHg)


* Cargar una capa de entidades (Feature Layer)
[Código](http://bit.ly/1hsSHHd) | 
[Jugar](http://bit.ly/1mweYMe) | 
[Previsualizar](http://bit.ly/1ijQvkU)

Configura tu entorno en local
---------------
TODO: Documentar cómo clonarse el repositorio en local para empezar a hacer pruebas más avanzadas que requieran autenticación, etc.

Introducción al desarrollo GIS
---------------
Después de jugar un poco con los tutoriales, vamos a ver cómo resolver problemas complejos usando GIS. Para ello tendremos que ir aprendiendo conceptos, formatos y vocabulario para no volvernos locos.

* [Geocodificación](#geocodificacin)
* [Direcciones](#direcciones)

### Geocodificación
La geocodificación hace referencia a la posibilidad de traducir una o varias direcciones a sus respectivas coodernadas y vicebersa.

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

