var dojoConfig = (function(){
    var base = "http://esri-es.github.io/Static-Maps-API-ArcGIS"
    return {
        async: true,
        isDebug: true,
        packages:[{
            name: 'esriES', location: base + '/js', main: "staticmap"
        }]
    };
})();