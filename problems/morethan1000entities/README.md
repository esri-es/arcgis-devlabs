# Crear un mapa con más de 1000 entidades interactivas
**Problema**: al intentar cargar un feature layer con más de 1000 entidades en un mapa sólo se visualizan un máximo de 1000 entidades

**Razón**: por defecto una consulta a un feature alojado en ArcGIS Online devuelve un máximo de 1000 entidades ([*Max Record Count*](http://services5.arcgis.com/6gwZHZyCCsxPuNBv/arcgis/rest/services/Viladecans/FeatureServer/0)).

# Soluciones
Existen varias formas de evitar esta limitación.

## 1) Feature (SNAPSHOT)
Existe la posibilidad de cargar una capa de entidades (FeatureLayer) en modo SNAPSHOT, esto lo que hace es hacer tantas peticiones como sea necesaria al servicio hasta cargar todos los features: [ver demo](http://esri-es.github.io/JavascriptAPI/problems/morethan1000entities/feature_snapshot.html)
* **PROS**:
  * Sólo necesitamos un feature layer (a diferencia de otras soluciones), y por tanto ocupamos menos espacio de nuestra cuota en ArcGIS Online.
  * Menos líneas de código
* **CONTRAS**:
  * Los features se van cargando de 1000 en 1000, por tanto tardan en verse todos los features
  * Al cargar tanta información en la memoria del navegador se pueden dar problemas de rendimiento en algunos navegadores/dispositivos.

## 2) Tiled + Feature (SNAPSHOT)
Cargar una capa cacheada (ArcGISTiledMapServiceLayer) y posteriormente una capa de entidades en modo SNAPSHOT con opacidad 0 para poder recuperar la información de cada polígono: [ver demo](http://esri-es.github.io/JavascriptAPI/problems/morethan1000entities/tiled_feature_snapshot.html)
* **PROS**: 
  * Las entidades (polígonos) se visualizan más rápida que en la solución 1), el problema es que no sabemos qué entidades son interactivos en cada momento (porque se van cargando poco a poco).
* **CONTRAS**:
  * Necesitamos alojar una capa cacheada
  * Problema de usabilidad: El usuario no sabe cuándo están cargados todos los polígonos y por tanto cuando es 100% interactivo el mapa
  * Igual que con la solución 1), continuamos con el riesgo de problemas de rendimiento

## 3) Usar un webmap
Usando el [editor de webmaps de ArcGIS Online](http://www.arcgis.com/home/webmap/viewer.html?useExisting=1) podemos crear un webmap con las capas y configuraciones deseadas cargarlo usando JavaScript: [Ver demo](http://esri-es.github.io/JavascriptAPI/problems/morethan1000entities/webmap.html)

* **PROS**:
  * Poco código
  * Posibilidad de configurar mapa de fondo, ventana emergente, etc desde el [editor de webmaps](http://www.arcgis.com/home/webmap/viewer.html?useExisting=1)
* **CONTRAS**:
  * Puede que todas las entidades no sean interactivas

## 4) Tiled + Feature (SNAPSHOT) + Progreso
Igual que la solución 2) pero añadir una barra de progreso para saber cuando el servicio está totalmente cargado.
* **PROS**:
  * Esta es una versión mejorada de la versión 2), de forma que el usuario puede saber cuando el mapa es 100% interactivo.
* **CONTRAS**:
  * Requiere un poco más de código que la solución 2)
  * Seguimos con el resto de problemas de la solución 2) salvo del de usabailidad.

## 5) Comportamiento condicionado a la escala
Crear un mapa que sólo deje seleccionar entidades en niveles de zoom cercanos. Esto podríamos hacerlo sin tener que escribir mucho código usando el [editor de webmaps](http://www.arcgis.com/home/webmap/viewer.html?useExisting=1), aunque también podríamos hacerlo manualmente con JavaScript.

* **PROS**:
  * Mejoras a nivel de rendimiento y usabilidad:
    * Rendimiento: podemos optimizar el rendimiento reduciendo la cantidad de información cargada en cada momento a la mínima e imprescindible
    * Usabilidad: no tiene mucho sentido en una pantalla de 1024x780px o similar pintar miles de polígonos, serán tan pequeños que realmente será prácticamente imposible seleccionar el polígono deseado en un nivel de zoom tan lejano, por tanto de si condicionamos el comportamiento al nivel de zoom probablemente mejoremos la usabilidad del mapa.
* **CONTRAS**:
  * Puede requerir mayor trabajo a nivel de código.