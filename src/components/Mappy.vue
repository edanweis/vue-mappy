<template>

  <mapbox :id="container" :class="container" :access-token="token" 
    :map-options='{
      style: "mapbox://styles/mapbox/streets-v9",
      center: this.LngLat,
      zoom: 16,
      container: this.container
    }'
    :navControl='{show: false}'
    @map-init='mapInit'
    @map-click='mapClick'
    @map-zoom='mapZoom'
    @map-move='mapMove'
    @map-moveend='mapMoveend'
    @map-movestart='mapMovestart'
    @map-load='mapLoad'
    @map-styledataloading='mapStyleloading'
    @map-touchend='mapTouchend'
    @map-touchstart='mapTouchstart'
    @map-dblclick='mapDblclick'>
  </mapbox>
  
</template>

<script>
import Vue from 'vue'
import Mapbox from 'mapbox-gl-vue';
import Marker from './Marker'
import store from '../store.js' 

export default {
  name: 'Mappy',
  props: ['LngLat', 'mapStyle', 'container', 'mapStyle', 'features', 'token'],
  components:{
    Mapbox
  },
  data () {
    return {
      areFeaturesLoaded: false,
      _map: null
    }
  },
  watch: {
    features: function(val){
      if(val && !this.areFeaturesLoaded){
        this.addMarkers(val)
      }
    }
  },
  methods: {
    addMarkers(features){
      var self = this
      const makerContent = Vue.extend(Marker)
      features.forEach(function(feature, index) {
        var parent = document.createElement('div');
            parent.classList.add("mapboxgl-marker");
        var child = document.createElement('div')
            child.classList.add("marker");
        parent.appendChild(child);
         const marker = new mapboxgl.Marker(parent)
         .setLngLat(feature.geometry.coordinates)
         .addTo(self._map)
        new makerContent({
          store: store,
          propsData: {
            zoom: self.zoom,
            feature: feature, 
            fbKey: feature['.key'],
            index: index,
          }
        }).$mount(child); 
      })
      this.areFeaturesLoaded = true
    },

    mapInit(map){
      // save map to component's data
      this._map = map
    },
    mapLoad(map){
      this.$emit('loaded', map)
      // Mapbox does not have a replace source method (?), so we remove and add a source
      if(map.getSource('features')){
        map.removeSource('features')
      }
      map.addSource('features', {
        type: 'geojson', 
        data: {
          type: 'FeatureCollection',
          features: this.features
        }
      })
    },
    mapClick(){

    },
    mapZoom(){

    },
    mapMove(){

    },
    mapMoveend(){

    },
    mapMovestart(){

    },
    mapStyleloading(){

    },
    mapTouchend(){

    },
    mapTouchstart(){

    },
    mapDblclick(){

    }
  }
}
</script>

<style scoped>

/*Map style should have same name as container*/
#map{
  position: absolute;
  left:0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
