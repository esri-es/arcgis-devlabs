# Crear un mapa con más de 1000 entidades interactivas
**Problema**: la API de JavaScript está limitado por defecto a un máximo de 1000 entidades simultaneamente en pantalla
**Razón**:

# Soluciones
Existen varias formas de evitar esta limitación

## 1) Feature (SNAPSHOT)
Pintar feature en modo SNAPSHOT: [ver demo](http://esri-es.github.io/JavascriptAPI/problems/morethan1000entities/feature_snapshot.html)
* **PROS**:
  * Sólo necesitamos un feature layer (a diferencia de otras soluciones), y por tanto ocupamos menos espacio de nuestra cuota en ArcGIS Online.
  * Menos líneas de código
* **CONTRAS**:
  * Los features se van cargando de 1000 en 1000, por tanto tardan en verse todos los features

## 2) Tiled + Feature (SNAPSHOT)
Pintar una capa cacheada y encima feature (SNAPSHOT) con opacidad 0, [ver demo](http://esri-es.github.io/JavascriptAPI/problems/morethan1000entities/tiled_feature_snapshot.html)
* **PROS**: 
  * Las entidades (polígonos) se visualizan más rápida que en la solución 1), el problema es que no sabemos qué entidades son interactivos en cada momento (porque se van cargando poco a poco).
* **CONTRAS**:
  * Necesitamos alojar una capa cacheada
  * El usuario no sabe cuándo están cargados todos los polígonos y por tanto cuando es 100% interactivo el mapa

## 3) Usar un webmap
Usando el [editor de webmaps de ArcGIS Online](http://www.arcgis.com/home/webmap/viewer.html?useExisting=1) creamos un webmap con las capas y las configuraciones deseadas y lo cargamos usando la API. [Ver demo](http://esri-es.github.io/JavascriptAPI/problems/morethan1000entities/webmap.html)

* **PROS**:
  * Poco código
  * Posibilidad de configurar mapa de fondo, ventana emergente, etc desde el [editor de webmaps](http://www.arcgis.com/home/webmap/viewer.html?useExisting=1)
* **CONTRAS**:
  * Puede que todas las entidades no sean interactivas

## 4) Tiled + Feature (SNAPSHOT) + Progreso
Pintar con tiled y encima feature + barra de progreso
* **PROS**:
  * Esta es una versión mejorada de la versión 2), de forma que el usuario puede saber cuando el mapa es 100% interactivo.
* **CONTRAS**:
  * Requiere un poco más de código

## 5) Comportamiento condicionado a la escala
Crear un mapa que sólo deje seleccionar entidades en niveles de zoom cercanos. Esto podríamos hacerlo sin tener que escribir mucho código usando el  [editor de webmaps](http://www.arcgis.com/home/webmap/viewer.html?useExisting=1), aunque también podríamos hacerlo manualmente.

* **PROS**:
  * En cuanto a usabilidad no tiene mucho sentido en una pantalla de 1024x780px o similar pintar miles de polígonos, serán tan pequeños que realmente será prácticamente imposible seleccionar el polígono deseado en un nivel de zoom tan lejano, por tanto de si condicionamos el comportamiento al nivel de zoom probablemente mejoremos la usabilidad del mapa.
* **CONTRAS**:
  * Puede requerir mayor trabajo a nivel de código.