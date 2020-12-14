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
      var map = new Map({ 
        basemap: "streets-navigation-vector" 
      }); 
      view = new MapView({ 
        container: "wrapper-map", 
        map: map, 
        center: [-3.690504, 41.670161], 
        zoom: 11 
      }); 
    });