import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import Graphic from "https://js.arcgis.com/4.18/@arcgis/core/Graphic.js";
import Locator from "https://js.arcgis.com/4.18/@arcgis/core/tasks/Locator.js";
import esriConfig from "https://js.arcgis.com/4.18/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK1008d4b22a644cc5b56fb43d57e3122cg3TmsxUiiAzSUiR27UN1N0wGdN9Y2os_R9Qq-m2naCcwc_7kAKB3LUaqgeLvExPk";

const map = new Map({
  basemap: "dark-gray"
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

const checkIfEnter = (evt) => {
  if (evt.keyCode === 13) getAddressLocation();
};

document.getElementById("btnLocate").addEventListener("click", getAddressLocation);

document.getElementById('address').addEventListener("keyup", checkIfEnter);

function getAddressLocation() {
  view.graphics.removeAll();

  var objAddress = {
    "SingleLine": document.getElementById('address').value
  };

  var params = {
    address: objAddress,
    outFields: ["*"]
  };

  const taskLocator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

  taskLocator
    .addressToLocations(params)
    .then(response => showResults(response));
};

function showResults(candidates) { 
  let geometryLocation;
  if (candidates.length !== 0) {
    const bestCandidate = candidates[0];

    geometryLocation = bestCandidate.location;

    const simpleMarkerSymbol = {
      type: "simple-marker",
      style: "x",
      outline: { width: 2 }
    };

    const graphicResult = new Graphic(
      geometryLocation, 
      simpleMarkerSymbol
    );

    const textSymbol = {
      type: "text",
      text: bestCandidate.attributes.Place_addr,
      font: { 
        size: 13, 
        decoration: "underline",
        weight: "bold" 
      },
      color: [16, 19, 178, 1],
      xoffset: 0,
      yoffset: -22
    };

    var textGraphicResult = new Graphic(
      geometryLocation, 
      textSymbol
    );

    view.graphics.addMany([graphicResult, textGraphicResult]);
    
    view.center = [geometryLocation.longitude, geometryLocation.latitude];
    view.zoom = 10;
  };
  if (geometryLocation === undefined) {
    view.center = [-3.769188,39.921330];
    view.zoom = 6;
  };
};