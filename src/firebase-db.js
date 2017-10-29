var Firebase = require('firebase/app');
require('firebase/database');

var config = require('./credentials.js')
console.log(config.firebase)
var fb = Firebase.initializeApp(config.firebase)
const db = fb.database()

export { db, fb } 