import Map from "https://js.arcgis.com/4.19/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";
esriConfig.apiKey = "AAPK38d0654e1eb749b7b6cfc3079bbfdf44KkQ5OBC4rat6o-i1VOw7ZF1KBDM5dz15O0LTwwLLOdzqFeLwVopKBOQQ0Z-qP4VJ";

const basemapStyle = 'streets';

const map = new Map({
    basemap: basemapStyle
});

const view = new MapView({
    map: map,
    container: "viewMap",
    center:  [2.823982,42.008496],
    zoom: 12
});

const select = document.getElementById('selectBasemap');
select.addEventListener('change', () => {
    console.log('w')
    console.log('select', select.value);
    map.basemap = select.value;
});