import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import Graphic from "https://js.arcgis.com/4.18/@arcgis/core/Graphic.js";

const map = new Map({
  basemap: "gray-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  extent: {
    xmin: -695101.3538393214,
    ymin: 5264104.536846918,
    xmax: -489791.4958652594,
    ymax: 5409640.63870195,
    spatialReference: {
      wkid: 102100
    }
  }
});

// SimpleMarkerSymbol
const simplePointer = {
  type: 'point',
  longitude: -6.004906,
  latitude: 43.011684
};

const simpleMarkerSymbol = {
  type: "simple-marker",
  style: "diamond",
  outline: { color: [34, 81, 34, 0.86] },
  size: 21,
  color: [230, 217, 40, 0.92]
};

const simpleMarkerGraphic = new Graphic({
  geometry: simplePointer,
  symbol: simpleMarkerSymbol
});

// Picture marker
const picturePointer = {
  type: 'point',
  longitude: -5.837364,
  latitude: 43.358144
};

const pictureMarkerSymbol = {
  type: "picture-marker",
  url: "https://img.icons8.com/dusk/64/000000/marker.png",
  width: 30,
  height: 30
};

const pictureGraphic = new Graphic({
  geometry: picturePointer,
  symbol: pictureMarkerSymbol
});

// Text Symbol
const textMarker = {
  type: 'point',
  longitude: -5.283241,
  latitude: 42.944619
};

const textMarkerSymbol = {
  type: "text",
  text: "Embalse del Porma",
  font: { size: 13, decoration: "underline" },
  color: [16, 19, 178, 1]
};

const textGraphic = new Graphic({
  geometry: textMarker,
  symbol: textMarkerSymbol
});

/// POLYLINE
var polyline = {
  type: "polyline", 
  paths: [[-6.304283,42.933308], [-6.073570,42.963465], [-5.787926,42.786338], [-5.595665,42.612745], [-5.749474,42.343327]]
};

var lineSymbol = {
  type: "simple-line",
  width: 2,
  color: [161, 15, 174, 1]
};

var polylineGraphic = new Graphic({
  geometry: polyline,
  symbol: lineSymbol
});

// POLYGON

// SimpleFill Symbol
var simpleFill = {
  type: "polygon",
  rings: [[-5.105400,43.296206], [-4.830742,43.270213], [-4.635735,43.272213],  [-4.619255,43.216193], [-4.860954,43.098984], [-5.097160,43.100990],  [-5.043602,43.209187]]
};

var fillSymbol = {
  type: "simple-fill",
  style: "diagonal-cross",
  color: [25, 182, 41, 1],
  outline: {
    color: [255, 255, 255],
    width: 1
  }
};

var simpleFillGraphic = new Graphic({
  geometry: simpleFill,
  symbol: fillSymbol
});

// PictureFill Symbol
var pictureFill = {
  type: "polygon",
  rings: [ [-5.455589,43.232204], [-5.378685,43.292208], [-5.286675,43.266213],  [-5.256462,43.170138],  [-5.300407,43.112019], [-5.433617,43.169136]]
};

var pictureFillSymbol = {
  type: "picture-fill",
  url: "https://img.icons8.com/offices/30/26e07f/deciduous-tree.png",
  width: 8,
  height: 8
};

var pictureFillGraphic = new Graphic({
  geometry: pictureFill,
  symbol: pictureFillSymbol
});

// Polygon donut
var polygon = {
  type: "polygon",
  rings: [
    [
      [-5.603218,42.886537], 
      [-5.056648,42.896599],
      [-5.073128,42.560674],
      [-5.493355,42.623356]
    ],
    [
      [-5.446663,42.773738],
      [-5.413704,42.692032],
      [-5.161018,42.796919]
    ]
  ]
};

var fillSymbol = {
  type: "simple-fill",
  color: [231, 32, 32, 0.25],
  outline: {
    color: [255, 255, 255],
    width: 1
  }
};

var polygonGraphic = new Graphic({
  geometry: polygon,
  symbol: fillSymbol
});

view.graphics.addMany([simpleMarkerGraphic, pictureGraphic, textGraphic, polylineGraphic, simpleFillGraphic, pictureFillGraphic, polygonGraphic]);