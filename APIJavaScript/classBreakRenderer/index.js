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

const less1 = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: "#ffe6f1",
  style: "solid",
  outline: {
    width: 0.2,
    color: [255, 255, 255, 0.5]
  }
};

const less2 = {
  type: "simple-fill",
  color: "#b5c2d9",
  style: "solid",
  outline: {
    width: 0.2,
    color: [255, 255, 255, 0.5]
  }
};

const less3 = {
  type: "simple-fill",
  color: "#6b9dc0",
  style: "solid",
  outline: {
    width: 0.2,
    color: [255, 255, 255, 0.5]
  }
};

const less4 = {
  type: "simple-fill",
  color: "#366272",
  style: "solid",
  outline: {
    width: 0.2,
    color: [255, 255, 255, 0.5]
  }
};

const more5 = {
  type: "simple-fill",
  color: "#002624",
  style: "solid",
  outline: {
    width: 0.2,
    color: [255, 255, 255, 0.5]
  }
};

const populationDefaultSymbol = {
  type: "simple-fill",
  color: "black",
  style: "backward-diagonal",
  outline: {
    width: 0.1,
    color: [50, 50, 50, 0.6]
  }
};

const populationRenderer = {
  type: "class-breaks", // autocasts as new ClassBreaksRenderer()
  field: "HabHa",
  defaultSymbol: populationDefaultSymbol,
  defaultLabel: "no data",
  classBreakInfos: [
    {
      minValue: 0,
      maxValue: 1,
      symbol: less1,
      label: "< 1"
    },
    {
      minValue: 1.00001,
      maxValue: 2,
      symbol: less2,
      label: "< 2"
    },
    {
      minValue: 2.00001,
      maxValue: 3,
      symbol: less3,
      label: "< 3"
    },
    {
      minValue: 3.00001,
      maxValue: 4,
      symbol: less4,
      label: "< 4"
    },
    {
      minValue: 4.0001,
      maxValue: 100,
      symbol: more5,
      label: "> 5"
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