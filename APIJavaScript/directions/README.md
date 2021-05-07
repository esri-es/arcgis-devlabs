# Obtener direcciones

[Demo](http://esri-es.github.io/arcgis-devlabs/APIJavaScript/directions/)

En este tutorial integramos el [widget de direcciones](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions.html) que ofrece la propia API de ArcGIS. 

## Pasos

### 1. Creamos el mapa y definimos su vista
```js
esriConfig.apiKey = "your-api-key";

const map = new Map({
  basemap: "streets-navigation-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  extent: {
    xmin: -1773054.656243247,
    ymin: 3223252.853747136,
    xmax: -1699675.1090895766,
    ymax: 3260286.593951254,
    spatialReference: {
       wkid: 102100
    }
  }
});
```

### 2. Añadir el widget de direcciones
El widget viene predefinido con que solo tendremos que añadirle a la vista y definir su posición.
```js
var directionsWidget = new Directions({
  view: view
});

view.ui.add(directionsWidget, {
  position: "top-right",
  index: 2
});
```
>**Nota:** Este tutorial es muy sencillo porque solo consiste en agregar un widget a la vista. En este mismo repositorio hay un [tutorial](https://github.com/esri-es/arcgis-devlabs/tree/master/APIJavaScript/routeTask) sobre cómo hacer esta misma funcionalidad con el [servicio de creación de rutas](https://developers.arcgis.com/javascript/latest/sample-code/tasks-route/)