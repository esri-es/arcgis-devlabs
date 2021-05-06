import esriConfig from "https://js.arcgis.com/4.18/@arcgis/core/config.js";
import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import Graphic from "https://js.arcgis.com/4.18/@arcgis/core/Graphic.js";

import RouteTask from "https://js.arcgis.com/4.18/@arcgis/core/tasks/RouteTask.js";
import RouteParameters from "https://js.arcgis.com/4.18/@arcgis/core/tasks/support/RouteParameters.js";
import FeatureSet from "https://js.arcgis.com/4.18/@arcgis/core/tasks/support/FeatureSet.js";


esriConfig.apiKey = "AAPK38d0654e1eb749b7b6cfc3079bbfdf44KkQ5OBC4rat6o-i1VOw7ZF1KBDM5dz15O0LTwwLLOdzqFeLwVopKBOQQ0Z-qP4VJ";

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

const routeTask = new RouteTask({
  url: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
});

view.on("click", function (event) {

  if (view.graphics.length === 0) {
    addGraphic("origin", event.mapPoint);
  } else if (view.graphics.length === 1) {
    addGraphic("destination", event.mapPoint);

    getRoute(); // Call the route service

  } else {
    view.graphics.removeAll();
    addGraphic("origin", event.mapPoint);
  }

});

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

function getRoute() {
  const routeParams = new RouteParameters({
    stops: new FeatureSet({
      features: view.graphics.toArray()
    }),

    returnDirections: true

  });

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

}