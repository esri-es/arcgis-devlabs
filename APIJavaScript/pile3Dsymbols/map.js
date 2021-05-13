import Map from "https://js.arcgis.com/4.19/@arcgis/core/Map.js";
import SceneView from "https://js.arcgis.com/4.19/@arcgis/core/views/SceneView.js";
import Graphic from "https://js.arcgis.com/4.19/@arcgis/core/Graphic.js";
import WebStyleSymbol from "https://js.arcgis.com/4.19/@arcgis/core/symbols/WebStyleSymbol.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK38d0654e1eb749b7b6cfc3079bbfdf44KkQ5OBC4rat6o-i1VOw7ZF1KBDM5dz15O0LTwwLLOdzqFeLwVopKBOQQ0Z-qP4VJ";

const map = new Map({
  basemap: "arcgis-streets-relief"
});

const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    position: {
      spatialReference: {
        latestWkid: 3857,
        wkid: 102100
      },
      x: -424954.19966221525,
      y: 5373511.091342802,
      z: 143.77535701170564
    },
    heading: 348.7768915962875,
    tilt: 66.59725442919594
  }
});

var containerSymbol = new WebStyleSymbol({
  name: "Cargo_Box", // More Icons https://developers.arcgis.com/javascript/latest/visualization/symbols-color-ramps/esri-web-style-symbols-3d/
  styleName: "EsriRealisticTransportationStyle",
});

var container1 = {
  type: "point",
  x: -3.818255,
  y: 43.406023
};

var container2 = {
  type: "point",
  x: -3.818255,
  y: 43.406023,
  z: 2
};

var containerGraphic1 = new Graphic({
  geometry: container1,
  symbol: containerSymbol,
  popupTemplate: {
    title: 'Contenedor 1',
    content: 'Gadgets'
  }
});

var containerGraphic2 = new Graphic({
  geometry: container2,
  symbol: containerSymbol,
  popupTemplate: {
    title: 'Contenedor 2',
    content: 'Fabric'
  }
});

view.graphics.addMany([containerGraphic1, containerGraphic2]);