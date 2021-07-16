import Map from "https://js.arcgis.com/4.20/@arcgis/core/Map.js";
import Camera from "https://js.arcgis.com/4.20/@arcgis/core/Camera.js";
import Point from "https://js.arcgis.com/4.20/@arcgis/core/geometry/Point.js";
import SceneView from "https://js.arcgis.com/4.20/@arcgis/core/views/SceneView.js";
import Graphic from "https://js.arcgis.com/4.20/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.20/@arcgis/core/layers/GraphicsLayer.js";
import esriConfig from "https://js.arcgis.com/4.20/@arcgis/core/config.js";
import esriRequest from "https://js.arcgis.com/4.20/@arcgis/core/request.js";

esriConfig.apiKey = "AAPK38d0654e1eb749b7b6cfc3079bbfdf44KkQ5OBC4rat6o-i1VOw7ZF1KBDM5dz15O0LTwwLLOdzqFeLwVopKBOQQ0Z-qP4VJ";

const graphicLayer = new GraphicsLayer();

const map = new Map({
    basemap: "satellite",
    layers: [graphicLayer]
});

const view = new SceneView({
    container: "viewMap",
    map: map,
    zoom: 4
});

view.when(() => getPosition());

var iss3D = {
    type: "picture-marker",
    url: "./images/iss2.png",
    width: 100,
    height: 100
};

let long;
let lat;
const url = 'http://api.open-notify.org/iss-now.json'

const getPosition = () => {
    esriRequest(url, {
        responseType: "json"
    }).then(function (response) {
        let geoJson = response.data;
        locateISS(geoJson.iss_position.longitude, geoJson.iss_position.latitude)
    });
};

function locateISS(longitude, latitude) {

    console.log('longitude', longitude, latitude)
    var issGraphic = new Graphic({
        geometry: {
            type: 'point',
            x: longitude,
            y: latitude,
            z: 450 // in meters
        },
        symbol: iss3D,
        popupTemplate: {
            title: 'Localización actual de la Estación Espacial Internacional',
            content: `Longitud: ${longitude}
                        <br> Latitud: ${latitude}`
        }
    });
    graphicLayer.add(issGraphic);

    centerView(longitude, latitude);
};

document.getElementById("toISS").addEventListener("click", () => getLastPosition());

document.getElementById("peopleIcon").addEventListener("click", () => {
    document.getElementById('modalPeople').active = true;
    getPeople();
});

const getPeople = () => {
    fetch('http://api.open-notify.org/astros.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(document.getElementById('modalPeople'))
        document.getElementById('peopleContent').innerHTML = `Ahora mismo hay ${data.number} personas en el espacio.`;
        document.getElementById('peopleList').innerHTML = '';
        data.people.map((person) => {
            document.getElementById('peopleList').innerHTML += `<li>${person.name}</li>`
        })
    });
};

function getLastPosition () {
    const iss = graphicLayer.graphics.items[0].geometry;
    centerView(iss.longitude, iss.latitude)
}

function centerView(longitude, latitude) {
    let cam = new Camera({
        position: new Point({
            x: longitude, // lon
            y: latitude,      // lat
            z: 999999.99999999999,   // elevation in meters
        }),
        heading: 0, // orientación
        tilt: 0     // ángulo
    });
    view.goTo(cam);
}

document.getElementById("infoIcon").addEventListener("click", () => document.getElementById('modal').active = true);


function updatePosition() {
    graphicLayer.removeAll();
    getPosition();
    setTimeout(updatePosition, 60000); // 1min
};
updatePosition();

view.on('click', () => console.log(view.camera.position));