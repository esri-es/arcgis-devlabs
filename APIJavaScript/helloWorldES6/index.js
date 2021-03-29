import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import Graphic from "https://js.arcgis.com/4.18/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/GraphicsLayer.js";

const map = new Map({
    basemap: "dark-gray-vector"
});


const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [-3.690504, 41.670161],
    zoom: 6
});


const point = {
    type: 'point',
    longitude: -3.688167,
    latitude: 41.671088
};

const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [0, 169, 230, 1],
    outline: {
        color: [255, 255, 255],
        width: 1
    }
};

const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol
});

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

graphicsLayer.add(pointGraphic);
