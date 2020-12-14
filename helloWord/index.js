'use strict';

require([ 
  "esri/Map",  
  "esri/views/MapView", 
  "esri/layers/GraphicsLayer",  
  "esri/Graphic"],  
  function ( 
    Map,  
    MapView,  
    GraphicsLayer,  
    Graphic) { 
      const map = new Map({ 
        basemap: "streets-navigation-vector" 
      }); 
      const view = new MapView({ 
        container: "wrapper-map", 
        map: map, 
        center: [-3.690504, 41.670161], 
        zoom: 11 
      }); 
    });