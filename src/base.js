
const config = {
    apiKey: "AIzaSyBXmRQ5GO0bGdJkMK04uPc6A9tiq8d5AI4",
    authDomain: "mercadodev-8f12c.firebaseapp.com",
    databaseURL: "https://mercadodev-8f12c.firebaseio.com",
    projectId: "mercadodev-8f12c",
    storageBucket: "mercadodev-8f12c.appspot.com",
    messagingSenderId: "1054416214286"
  };

const Rebase = require('re-base')
const firebase = require('firebase/app')
require('firebase/database')

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export default base