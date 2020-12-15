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
        // extent: {
        //   xmin: -462266,
        //   ymin: 5031529,
        //   xmax: -295939,
        //   ymax: 5157498,
        //   spatialReference: {
        //     wkid: 102100
        //   }
        // }
      }); 

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const point = { 
        type: 'point', 
        longitude: -3.688167, 
        latitude: 41.671088 
      }; 

      const simpleMarkerSymbol = { 
        type: "simple-marker", 
        color: [226, 119, 40], 
        outline: { 
          color: [255, 255, 255], 
          width: 1 
        } 
      }; 

      const pointGraphic = new Graphic ({
        geometry: point,
        symbol: simpleMarkerSymbol
      });

      graphicsLayer.add(pointGraphic);
    });