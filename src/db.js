import firebase from "firebase/app"
import "firebase/firestore"

firebase.initializeApp({
  apiKey: "AIzaSyDBHex6C7tXKZEI6uGpj8K3a3UsMq4p5KA",
  authDomain: "leaderboard-us.firebaseapp.com",
  databaseURL: "https://leaderboard-us.firebaseio.com",
  projectId: "leaderboard-us",
  storageBucket: "leaderboard-us.appspot.com",
  messagingSenderId: "403053669068",
  appId: "1:403053669068:web:80c9260d8046bbf1"
})

export const InstanceCollection = firebase.firestore().collection(`instances`)
export const TeamsCollection = firebase.firestore().collection("teams")
export const PointsCollection = firebase.firestore().collection("points")
