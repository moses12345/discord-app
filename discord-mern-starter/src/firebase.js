import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCKZDYX5Zh5FEniuxRyGvTiCRFoLxwN_qI",
    authDomain: "discord-f0029.firebaseapp.com",
    projectId: "discord-f0029",
    storageBucket: "discord-f0029.appspot.com",
    messagingSenderId: "252970041498",
    appId: "1:252970041498:web:a3450e221214fe45fd5f23"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
