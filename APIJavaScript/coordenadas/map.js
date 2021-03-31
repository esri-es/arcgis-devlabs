import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";

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

view.on('click', function(event) {
  var lat = (event.mapPoint.latitude).toFixed(6);
  var lon = (event.mapPoint.longitude).toFixed(6);
  
  view.popup.open({
    title: "Point information",
    content: `<b>Longitude and latitude:</b> [${lon},${lat}]
      <br> <b>Zoom:</b> ${view.zoom}
      <br> <b>Extension:</b>
      <br>
      &nbsp;&nbsp; <b>xmin:</b> ${view.extent.xmin},<br>
      &nbsp;&nbsp; <b>ymin:</b> ${view.extent.ymin},<br>
      &nbsp;&nbsp; <b>xmax:</b> ${view.extent.xmax},<br>
      &nbsp;&nbsp; <b>ymax:</b> ${view.extent.ymax},<br>
      &nbsp;&nbsp; <b>spatialReference: </b>{<br>
        &nbsp;&nbsp; &nbsp;&nbsp; <b>wkid: </b>${view.extent.spatialReference.wkid}<br>
      &nbsp;&nbsp; }`,
    location: event.mapPoint
  });
});

function getExtension () {
  view.popup.location = view.center;
  view.popup.open({
    title: "Map information",
    content: `
      <b>Extension:</b>
      <br>
      &nbsp;&nbsp; <b>xmin:</b> ${view.extent.xmin},<br>
      &nbsp;&nbsp; <b>ymin:</b> ${view.extent.ymin},<br>
      &nbsp;&nbsp; <b>xmax:</b> ${view.extent.xmax},<br>
      &nbsp;&nbsp; <b>ymax:</b> ${view.extent.ymax},<br>
      &nbsp;&nbsp; <b>spatialReference: </b>{<br>
        &nbsp;&nbsp; &nbsp;&nbsp; <b>wkid: </b>${view.extent.spatialReference.wkid}<br>
      &nbsp;&nbsp; }`
  });
};

const button = document.getElementById('extensionButton');
button.addEventListener('click', getExtension)