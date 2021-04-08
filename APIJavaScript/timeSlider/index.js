import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";
import TimeSlider from "https://js.arcgis.com/4.18/@arcgis/core/widgets/TimeSlider.js";

const layer = new FeatureLayer({
  url:
    "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NDFD_Precipitation_v1/FeatureServer/1"
});

const map = new Map({
  basemap: "hybrid",
  layers: [layer]
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  zoom: 4,
  center: [-100, 30]
});

const timeSlider = new TimeSlider({
  container: "timeSlider",
  view: view,
  timeVisible: true, // horas en el inicio del slider
  //loop: true // llega al final y vuelve al principio
});

view.whenLayerView(layer)
.then(function (lv) {
  console.log('layer', layer);
  console.log('lv', lv)
  timeSlider.fullTimeExtent = layer.timeInfo.fullTimeExtent.expandTo("days");
  // Avanza por días, horas... 
  // Carga todos los datos de golpe
});

