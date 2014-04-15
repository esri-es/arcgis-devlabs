JavascriptAPI
=============

Toda la documentación y ejemplos de este repositorio se han creado usando la [API Javascript de ArcGIS](https://developers.arcgis.com/javascript/).

Si quieres más información o tienes dudas puedes unirte al grupo de [Geo Developers](http://meetup.com/Geo-Developers/) y preguntar a través de [la lista de correo](http://www.meetup.com/Geo-Developers/messages/archive/).

Tutoriales
---------------

* Cómo pintar un mapa con el API JS de ArcGIS - 
[Código](http://bit.ly/Qn55l8) | 
[Jugar](http://bit.ly/P2B5Kl) | 
[Previsualizar](http://bit.ly/Qn55l8)

* Usar el widget de Geocodificación y personalizar el diseño - 
[Código](http://bit.ly/1hHmyk6) | 
[Jugar](http://bit.ly/1p6jFgS) | 
[Previsualizar](http://bit.ly/P2B5Kl)

Introducción al desarrollo GIS
---------------
Después de jugar un poco con los tutoriales, vamos a ver cómo resolver problemas complejos usando GIS. Para ello tendremos que ir aprendiendo conceptos, formatos y vocabulario para no volvernos locos.

* [Geocodificación](#geocodificacin)
* [Capas CSV](#capas-csv)
* [Direcciones](#direcciones)

### Geocodificación
La geocodificación hace referencia a la posibilidad de traducir una o varias direcciones a sus respectivas coodernadas y vicebersa.

<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/geocodificacion.png" />&nbsp;
<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/geocoding.png" />&nbsp;
<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/locator_suffix.png" />

La clase utilizada para hacer geocodificación en la API es **Locator** ([Ver documentación](https://developers.arcgis.com/javascript/jsapi/locator-amd.html).

*Para aquellos que tengan una organización propia en ArcGIS Online y un servicio REST pueden configurar la clase Locator para que las peticiones se hagan a esta organización.*

Consumo de créditos:

* **Geosearch**: hacer una búsqueda de una dirección y pintar dónde está en el mapa no consume créditos.
* **Geocoding**: hacer búsquedas masivas y poder almacenar localmente los datos de latitud/longitud sí ([**máximo 1.250 geocodificaciones al mes**](https://developers.arcgis.com/en/credits/)).

Otros datos de interés:

* [**Ejemplos de uso de la geocodificación**](http://bit.ly/1eqqbKs)

<hr class="clear:both">
### Direcciones
*Todo*

