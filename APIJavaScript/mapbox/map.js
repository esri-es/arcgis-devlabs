const apiKeyEsri = 'AAPK88693226fd2c43b4ae1444555002dd30A3J4B-KNBcocpjBF6leM0rbdoFavbNMnWj4TMq_BVWCBHA8VJ8ebEN7ayQcI6dBc';
const basemapStyle = 'ArcGIS:DarkGray';

const map = new mapboxgl.Map({
  container: "map",
  style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${basemapStyle}?type=style&token=${apiKeyEsri}`,
  center: [-6.001902, 37.392535],
  zoom: 13
});

function showTrees() {
  const treesURL = "https://services1.arcgis.com/hcmP7kr0Cx3AcTJk/arcgis/rest/services/Parques_y_Jardines_Arbol_ZonaVerde/FeatureServer/0/query?where=1=1&outFields=*&f=pgeojson";

  map.addSource("points", {
    type: "geojson",
    data: treesURL
  });

  // Símbología común
  // map.addLayer({
  //   id: "trailheads-circle",
  //   type: "circle",
  //   source: "points",
  //   paint: {
  //     "circle-color": "rgba(193, 66, 66, 0.5)",
  //     "circle-stroke-width": 1.5,
  //     "circle-stroke-color": "white",
  //   }
  // });

  // Simbología en función del valor del campo Observ
  map.addLayer({
    id: "trees",
    type: "circle",
    source: "points",
    paint: {
      "circle-color": [
        "match",
        ["get", "Observ"],
        "Joven", "#228B22",
        "Maduro", "#006400",
        "Recién plantado", "#ADFF2F",
        "Viejo", "#808000",
        "Decrépito", "#556B2F",
        "No consolidado", "#00FF00",
        "black" // default
      ]
    }
  });
}

function createLegend() {
  const labels = ['Joven', 'Maduro', 'Recién plantado', 'Viejo', 'Decrépito', 'No consolidado', 'Sin datos'];
  const colors = ["#228B22", "#006400", "#ADFF2F", "#808000", "#556B2F", "#00FF00", "#000"];

  for (i = 0; i < labels.length; i++) {
    const layer = labels[i];
    const color = colors[i];
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';

    const key = document.createElement('p');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    let value = document.createElement('span');
    value.innerHTML = layer;
    value.style.marginLeft = '3px'
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
}

map.on("load", () => {  
  showTrees();
  createLegend();
});

map.addControl(new mapboxgl.NavigationControl());