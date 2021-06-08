import Map from "https://js.arcgis.com/4.19/@arcgis/core/Map.js";
import Camera from "https://js.arcgis.com/4.19/@arcgis/core/Camera.js";
import Point from "https://js.arcgis.com/4.19/@arcgis/core/geometry/Point.js";
import SceneView from "https://js.arcgis.com/4.19/@arcgis/core/views/SceneView.js";
import Graphic from "https://js.arcgis.com/4.19/@arcgis/core/Graphic.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK38d0654e1eb749b7b6cfc3079bbfdf44KkQ5OBC4rat6o-i1VOw7ZF1KBDM5dz15O0LTwwLLOdzqFeLwVopKBOQQ0Z-qP4VJ";

const map = new Map({
    basemap: "satellite"
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


const getPosition = () => {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(data => {
            var issGraphic = new Graphic({
                geometry: {
                    type: 'point',
                    x: data.iss_position.longitude,
                    y: data.iss_position.latitude,
                    z: 450 // in meters
                },
                symbol: iss3D,
                popupTemplate: {
                    title: 'Localización actual de la Estación Espacial Internacional',
                    content: `Longitud: ${data.iss_position.longitude}
                    <br> Latitud: ${data.iss_position.latitude}`
                }
            });
            view.graphics.removeAll()
            view.graphics.add(issGraphic);

            centerView();
        });
};

document.getElementById("toISS").addEventListener("click", () => getPosition());

function centerView() {
    const iss = view.graphics.items[0].geometry;
    let cam = new Camera({
        position: new Point({
            x: iss.longitude, // lon
            y: iss.latitude,      // lat
            z: 20000,   // elevation in meters
        }),
        heading: 170, // facing due south
        tilt: 0     // bird's eye view
    });
    view.goTo(cam);
}

document.getElementById("infoIcon").addEventListener("click", () => document.getElementById('modalInfo').active = true);
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


