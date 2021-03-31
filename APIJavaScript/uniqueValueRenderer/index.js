import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";

const map = new Map({
  basemap: "streets-navigation-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-3.7032700, 40.4166400],
  zoom: 6
});

const levelRenderer = {
  type: "unique-value",
  field: "nivel",
  defaultSymbol: { type: "simple-marker", color: "pink"},
  uniqueValueInfos: [
    {
      value: "VERDE", 
      symbol: {
        type: "simple-marker",
        color: "green"
      }
    },
    {
      value: "ROJO", 
      symbol: {
        type: "simple-marker",
        color: "red"
      }
    },
    {
      value: "NEGRO", 
      symbol: {
        type: "simple-marker",
        color: "black"
      }
    },
    {
      value: "AMARILLO", 
      symbol: {
        type: "simple-marker",
        color: "yellow"
      }
    },
  ]
};


const roadAccidentsLayer = new FeatureLayer({
  url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/incidencias_DGT/FeatureServer/0",
  renderer: levelRenderer,
  outFields: ["*"],
  popupTemplate: {
    title: "{poblacion} ({provincia}) {fechahora_}",
    content: "Accidente en el km {pk_inicial} de la carretera {carretera}. El nivel del accidente es {nivel} y ha sido causado por {causa}."
  }
});

map.add(roadAccidentsLayer);