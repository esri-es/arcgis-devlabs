const apiKeyEsri = 'AAPK1008d4b22a644cc5b56fb43d57e3122cg3TmsxUiiAzSUiR27UN1N0wGdN9Y2os_R9Qq-m2naCcwc_7kAKB3LUaqgeLvExPk';
const basemapStyle = 'ArcGIS:Navigation';

const map = L.map('mapid', {
  center: [37.392535, -6.001902],
  zoom: 13
});

L.esri.Vector.vectorBasemapLayer(basemapStyle, {
  apiKey: apiKeyEsri
}).addTo(map);

// Geocoding
const searchPlaces = L.esri.Geocoding.geosearch({
  position: 'topright',
  placeholder: 'Introduce una dirección',
  useMapBounds: false,
  zoomToResult: true,
  providers: [L.esri.Geocoding.arcgisOnlineProvider({
    apikey: apiKeyEsri,
    nearby:  [40.421083, -3.705673]
  })]
}).addTo(map);

searchPlaces.on('results', function(result) {
  L.marker(result.latlng).addTo(map); // Add marker to map
  L.shapeMarkers.xMarker(result.latlng, 50).addTo(map) // Add X to map
});

// Create route

// Add a DOM Node to display the text routing directions
const directions = document.createElement("div");
directions.id = "directions";
directions.innerHTML = "Click on the map to create a start and end for the route.";
document.body.appendChild(directions);

// Layer Group for start/end-points
const startLayerGroup = L.layerGroup().addTo(map);
const endLayerGroup = L.layerGroup().addTo(map);

// Layer Group for route lines
const routeLines = L.layerGroup().addTo(map);

let currentStep = "start";
let startCoords, endCoords;

function updateRoute() {
  // Create the arcgis-rest-js authentication object to use later.
  const authentication = new arcgisRest.ApiKey({
    key: apiKeyEsri
  });

  // make the API request
  arcgisRest
    .solveRoute({
      stops: [startCoords, endCoords],
      endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
      authentication
    })
    .then((response) => {
      routeLines.clearLayers();
      L.geoJSON(response.routes.geoJson).addTo(routeLines);

      const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join("<br/>");
      directions.innerHTML = directionsHTML;
      startCoords = null;
      endCoords = null;
    })
    .catch((error) => {
      console.error(error);
      alert("There was a problem using the route service. See the console for details.");
    });
}

map.on("click", (e) => {
  const coordinates = [e.latlng.lng, e.latlng.lat];
  var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  if (currentStep === "start") {
    startLayerGroup.clearLayers();
    endLayerGroup.clearLayers();
    routeLines.clearLayers();
    L.marker(e.latlng, {icon: greenIcon}).addTo(startLayerGroup);
    startCoords = coordinates;
    currentStep = "end";
  } else {
    L.marker(e.latlng, {icon: redIcon}).addTo(endLayerGroup);
    endCoords = coordinates;
    currentStep = "start";
  }

  if (startCoords && endCoords) {
    updateRoute();
  }
});
