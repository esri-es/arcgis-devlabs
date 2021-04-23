import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import Directions from "https://js.arcgis.com/4.18/@arcgis/core/widgets/Directions.js";
import esriConfig from "https://js.arcgis.com/4.18/@arcgis/core/config.js";

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

var directionsWidget = new Directions({
  view: view
});

view.ui.add(directionsWidget, {
  position: "top-right",
  index: 2
});