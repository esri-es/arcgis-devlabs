# Creación de rutas (RouteTask)

[Demo](http://esri-es.github.io/arcgis-devlabs/APIJavaScript/routeTask/)

En este tutorial usaremos el servicio de creación de rutas de la API de ArcGIS con la [clase RouteTask](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-RouteTask.html).

> **Nota:** También es posible crear rutas con el widget de direcciones, puedes ver cómo en [otro tutorial de este repositorio](https://github.com/esri-es/arcgis-devlabs/tree/master/APIJavaScript/directions).


## Pasos

### 1. Creamos el mapa y su vista
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

### 2. Funcionalidad de la aplicación
Esta aplicación tan solo nos permite crear rutas entre dos puntos y su funcionamiento es muy sencillo: el primer click es el origen, el segundo será el destino y el tercer click borrará los anteriores pasando a ser el marcador del origen.
```js
view.on("click", function (event) {
  if (view.graphics.length === 0) {
    addGraphic("origin", event.mapPoint);
  } else if (view.graphics.length === 1) {
    addGraphic("destination", event.mapPoint);
  } else {
    view.graphics.removeAll();
    addGraphic("origin", event.mapPoint);
  }
});
```
Para poder visualizar esos clicks, añadiremos los gráficos correspondientes con la función *addGraphic*.

### 3. Añadir puntos de origen y destino
La función *addGraphic* añadirá a la vista un punto blanco o negro teniendo en cuenta si se trata del origen o del final de la ruta.
```js
function addGraphic(type, point) {
  const graphic = new Graphic({
    symbol: {
      type: "simple-marker",
      color: (type === "origin") ? "white" : "black",
      size: "9px"
    },
    geometry: point
  });
  view.graphics.add(graphic);
}
```
### 4. Creación de ruta
Lanzaremos la función que crea la ruta una vez tengamos el origen y el destino, es decir, en el segundo click. 
```js
view.on("click", function (event) {
  if (view.graphics.length === 0) {
    addGraphic("origin", event.mapPoint);
  } else if (view.graphics.length === 1) {
    addGraphic("destination", event.mapPoint);
    getRoute();
  } else {
    view.graphics.removeAll();
    addGraphic("origin", event.mapPoint);
  }
});
```
La función *getRoute* hará la petición al servicio de rutas. Para ello, usaremos la [clase RouteTask](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-RouteTask.html) que nos permite crear rutas entre dos o más puntos, añadir paradas, barreras y ventanas de tiempo. Vamos a verlo en detalle:
1. Declaramos el servicio de rutas y añadimos las paradas a los parámetros.
```js
function getRoute() {
  const routeTask = new RouteTask({
    url: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
  });

  const routeParams = new RouteParameters({
    stops: new FeatureSet({
      features: view.graphics.toArray()
    }),
    returnDirections: true
  });
}
```
2. Ejecutamos la función a través del método [*solve*](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-RouteTask.html#solve) y a partir del resultado de la promesa añadimos la ruta al mapa y mostramos las indicaciones por pantalla.
```js
routeTask.solve(routeParams)
  .then(function (data) {
    data.routeResults.forEach(function (result) {
      result.route.symbol = {
        type: "simple-line",
        color: [5, 150, 255],
        width: 3
      };
      view.graphics.add(result.route);
    });
    // Display directions
    if (data.routeResults.length > 0) {
      const directions = document.createElement("ol");
      directions.classList = "esri-widget esri-widget--panel esri-directions__scroller";
      directions.style.marginTop = "0";
      directions.style.padding = "15px 15px 15px 30px";
      const features = data.routeResults[0].directions.features;

      // Show each direction
      features.forEach(function (result, i) {
        const direction = document.createElement("li");
        direction.innerHTML = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
        directions.appendChild(direction);
      });

      view.ui.empty("top-right");
      view.ui.add(directions, "top-right");
    }
  })
  .catch(function (error) {
    console.log(error);
  })
```
> **Nota:** Al igual que en otros tutoriales, hemos utilizado la librería [Calcite](https://developers.arcgis.com/calcite-design-system/) propia de Esri para mejorar la interfaz.