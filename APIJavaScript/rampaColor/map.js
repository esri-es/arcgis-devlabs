import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";
import Legend from "https://js.arcgis.com/4.18/@arcgis/core/widgets/Legend.js";

const map = new Map({
  basemap: "gray-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-3.690468, 40.402254],
  zoom: 6
});

const defaultSym = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  outline: { // autocasts as new SimpleLineSymbol()
    color: [128, 128, 128, 0.2],
    width: "0.5px"
  }
};

const populationRenderer = {
  type: "simple", // autocasts as new SimpleRenderer()
  symbol: defaultSym,
  visualVariables: [
    {
      type: "color",
      field: "HabHa",
      stops: [
        {
          value: 0.5,
          color: "#ffe6f1",
          label: "<0.5"
        },
        {
          value: 5,
          color: "#002624",
          label: "> 5"
        }
      ]
    }
  ]
};

const populationLayer = new FeatureLayer({
  url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/La_Espa%c3%b1a_despoblada/FeatureServer/0",
  renderer: populationRenderer
});

map.add(populationLayer);

view.ui.add(
  new Legend({
    view: view,
    layerInfos: [{
      layer: populationLayer,
      title: "La España vaciada en 2018"
    }]
  }),
  "bottom-right"
);