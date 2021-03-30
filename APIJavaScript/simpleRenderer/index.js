import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";

const map = new Map({
  basemap: "dark-gray-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-1.866639, 38.996464],
  zoom: 8
});

var gasStationRenderer = {
  type: "simple", // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-marker",
    style: "diamond",
    outline: { color: [18, 43, 214, 1] },
    size: 11,
    color: [113, 190, 231, 0.25]
  }
};

const gasStationLayer = new FeatureLayer({
  url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Gasolineras_Pro/FeatureServer/0",
  renderer: gasStationRenderer,
  definitionExpression: "PROVINCIA = 'ALBACETE'"
});

map.add(gasStationLayer);