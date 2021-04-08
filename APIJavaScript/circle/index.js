import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import Circle from "https://js.arcgis.com/4.18/@arcgis/core/geometry/Circle.js";
import Graphic from "https://js.arcgis.com/4.18/@arcgis/core/Graphic.js";

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [2.899427,39.619845],
  zoom: 13
});

view.on('click', function(evt) {
  view.graphics.removeAll();
 
  const centroid = new Graphic({
    geometry: {
      type: 'point',
      longitude: evt.mapPoint.longitude,
      latitude: evt.mapPoint.latitude
    },
    symbol: { 
      type: "simple-marker", 
      style: "x", 
      outline: { 
        width: 2 
      } 
    }
  });

  var circle = new Circle({
    center: {
      x: evt.mapPoint.x,
      y: evt.mapPoint.y,
      spatialReference: evt.mapPoint.spatialReference.wkid
    },
    radius: 1500,
    radiusUnit: "meters"
  });

  var graphic = new Graphic(circle, {type: 'simple-fill'});
  view.graphics.addMany([graphic, centroid]);
});
