<template>
<div>
	<mappy container="map" :LngLat="[144.9746203,-37.82610754]" mapStyle="" :features="features" @loaded="loaded" :token="token"></mappy>	
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mapState from 'vuex'
import Mappy from './Mappy'
import {db} from '../firebase-db.js'

const credentials = require('../credentials.js')

export default {

  name: 'HelloWorld',
  components: {
  	Mappy
  },
  data () {
    return {
    	token: credentials.mapbox.token
    }
  },
  created(){
  	var self = this
  	var data = db.ref('data/features')

  	// We call a dispatch on the Vuex action so we can resolve the promise.
  	this.$store.dispatch('setDataRef', data ).then(response => {
  		// do something here to handle async loading if necessary.
  	})

  },
  computed:{
  	// not sure why Vuex.mapState isn't working.
	// ...Vuex.mapState(['features']),
	
	...Vuex.mapGetters(['features', 'map']),

  },
  watch:{

  },
  methods:{
	...Vuex.mapMutations(['setMap']), 
	...Vuex.mapActions([]), 

	loaded: function(map){
		this.setMap(map)
	}

  },
}
</script>

<style lang="css" scoped>


</style>