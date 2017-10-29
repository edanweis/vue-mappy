mappy
===

An example for how to wrap the [mapbox-gl-vue](https://github.com/phegman/vue-mapbox-gl) component with a Vuex store and firebase.

Notes
---

You must provide a `credentials.js` file in the `src` folder with the code:

```
module.exports  = {
	firebase: {
		apiKey : "firebase-api-key-here",
		databaseURL: "https://mappy-mappy.firebaseio.com",
	},
	mapbox: {
		token: "mapbox-token-here"
	}
}
```

Todo
---

[ ] Bind mounted Vue components to computed properties (?) so `Marker` updates with changes to Vuexfire state.
