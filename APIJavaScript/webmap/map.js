
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import WebMap from "https://js.arcgis.com/4.18/@arcgis/core/WebMap.js";

const webmap = new WebMap({
  portalItem: {
    id: "5147baf1009c47b298780dd5dcb14e01"
  }
});

webmap.basemap = "streets-navigation-vector";

const view = new MapView({
  map: webmap,
  container: "viewDiv",
  center: [-0.387833, 39.473387],
  zoom: 10
});
