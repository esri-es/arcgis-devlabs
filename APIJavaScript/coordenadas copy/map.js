import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import Draw from "https://js.arcgis.com/4.18/@arcgis/core/views/draw/Draw.js";
import Graphic from "https://js.arcgis.com/4.18/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/GraphicsLayer.js";


const map = new Map({
  basemap: "topo-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-3.7032700, 40.4166400],
  zoom: 6
});
view.popup.autoOpenEnabled = false;

const draw = new Draw({
  view: view
});
document.getElementById("line-button").onclick = function() {
  view.graphics.removeAll();
  const action = draw.create("polyline");
  action.on(
    [
      "vertex-add",
      "vertex-remove",
      "cursor-update",
      "redo",
      "undo"
    ],
    updateVertices
  );
  action.on("draw-complete", (e) => {
    console.log('e', e);
    const prueba = e.vertices[0];
    console.log('prueb', prueba)
    // view.popup.open({
    //   title: 'hola',
    //   // content: e.vertices[0]
    //   content: prueba
    // });
    // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=draw-line
  });
};

function updateVertices(event) {
  if (event.vertices.length > 1) {
    createGraphic(event);
  }
};

function createGraphic(event) {
  const vertices = event.vertices;
  view.graphics.removeAll();

  const graphic = new Graphic({
    geometry: {
      type: "polyline",
      paths: vertices,
      spatialReference: view.spatialReference
    },
    symbol: {
      type: "simple-line",
      color: [4, 90, 141],
      width: 4,
      cap: "round",
      join: "round"
    }
  });
  view.graphics.add(graphic);
};