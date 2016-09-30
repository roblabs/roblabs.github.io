<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.25.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.25.0/mapbox-gl.css' rel='stylesheet' />
<script>
  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ibGFicyIsImEiOiJwVlg0cnZnIn0.yhekddtKwZohGoORaWjqIw';
</script>

<style>
body { margin:0; padding:0; }
#map { position:absolute; top:0; bottom:0; width:100%; }
#menu {
    position: relative;
    background: #fff;
    padding: 10px;
    font-family: 'Open Sans', sans-serif;
}

#zoom-level {
  margin: 10px;
  padding: 10px;
  position: absolute;
  right: 0;
  top:50px;
  z-index: 1000;
  background: #ddd;
}
</style>
