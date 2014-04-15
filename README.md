JavascriptAPI
=============

Toda la documentación y ejemplos de este repositorio se han creado usando la [API Javascript de ArcGIS](https://developers.arcgis.com/javascript/).

Si quieres más información o tienes dudas puedes unirte al grupo de [Geo Developers](http://meetup.com/Geo-Developers/) y preguntar a través de [la lista de correo](http://www.meetup.com/Geo-Developers/messages/archive/).

Tutoriales
---------------

* Cómo pintar un mapa con el API JS de ArcGIS - [Código](https://github.com/esri-es/JavascriptAPI/blob/master/src/tutoriales/tutorial_1.html) | [Previsualizar](https://github.com/esri-es/JavascriptAPI/blob/master/src/tutoriales/tutorial_1.html)
* Usar el widget de Geocodificación y personalizar el diseño - [Código](https://github.com/esri-es/JavascriptAPI/blob/master/src/tutoriales/tutorial_2.html) | [Jugar](http://jsfiddle.net/drXnM/) | [Previsualizar](https://github.com/esri-es/JavascriptAPI/blob/master/src/tutoriales/tutorial_2.html)

Índice de contenidos
---------------

* [Geocodificación](#geocodificacin)
* [Capas CSV](#capas-csv)
* [Direcciones](#direcciones)

### Geocodificación
La geocodificación hace referencia a la posibilidad de traducir una o varias direcciones sus respectivas coodernadas y vicebersa.

<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/geocodificacion.png" />&nbsp;
<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/geocoding.png" />&nbsp;
<img src="https://raw.githubusercontent.com/esri-es/JavascriptAPI/master/img/locator_suffix.png" />

La clase utilizada para hacer geocodificación es [Locator](https://developers.arcgis.com/javascript/jsapi/locator-amd.html).

*Para aquellos que tengan una organización propia en ArcGIS Online y un servicio REST pueden configurar la clase Locator para que las peticiones se hagan a esta organización.*

Consumo de créditos:

* **Geosearch**: hacer una búsqueda de una dirección y pintar dónde está en el mapa no consume créditos
* **Geocoding**: hacer búsquedas masivas y recuperar los datos de latitud/longitud para poder almacenarlos sí

**Código de ejemplo** | [**Previsualizar**]() | [**Más ejemplos**](http://bit.ly/1eqqbKs) 

<hr class="clear:both">
### Direcciones
*Todo*

<hr class="clear:both">
### Capas CSV
*Todo*
