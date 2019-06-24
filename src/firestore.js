import React from "react"
import firebase from "firebase/app"
import "firebase/auth"
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

firebase.firestore().enablePersistence({ synchronizeTabs: true })
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export const FirebaseContext = React.createContext({})
export const InstanceCollection = firebase.firestore().collection(`instances`)
export const TeamsCollection = firebase.firestore().collection(`teams`)
export const PointsCollection = firebase.firestore().collection(`points`)

export const createInstanceListener = (
  domain,
  onSnapshot,
  resolveAfterInitialSnapshot = true
) => {
  return new Promise((resolve, reject) => {
    let listener = null
    if (resolveAfterInitialSnapshot) {
      listener = InstanceCollection.where("domain", "==", domain).onSnapshot(
        snap => {
          onSnapshot(snap)
          resolve(listener)
        }
      )
    } else {
      listener = InstanceCollection.where("domain", "==", domain).onSnapshot(
        onSnapshot
      )
      resolve(listener)
    }
  })
}

export const createTeamsListener = (
  instanceId,
  onSnapshot,
  resolveAfterInitialSnapshot = true
) => {
  return new Promise((resolve, reject) => {
    let listener = null
    if (resolveAfterInitialSnapshot) {
      listener = TeamsCollection.where(
        "instanceId",
        "==",
        instanceId
      ).onSnapshot(snap => {
        onSnapshot(snap)
        resolve(listener)
      })
    } else {
      listener = TeamsCollection.where(
        "instanceId",
        "==",
        instanceId
      ).onSnapshot(onSnapshot)
      resolve(listener)
    }
  })
}

export const createParticipantListener = (
  teamId,
  onSnapshot,
  resolveAfterInitialSnapshot = true
) => {
  return new Promise((resolve, reject) => {
    let listener = null
    if (resolveAfterInitialSnapshot) {
      listener = TeamsCollection.doc(teamId)
        .collection(`participants`)
        .onSnapshot(snap => {
          onSnapshot(snap)
          resolve(listener)
        })
    } else {
      listener = TeamsCollection.doc(teamId)
        .collection(`participants`)
        .onSnapshot(onSnapshot)
      resolve(listener)
    }
  })
}

export const createPointsListener = (
  instanceId,
  onSnapshot,
  resolveAfterInitialSnapshot = true
) => {
  return new Promise((resolve, reject) => {
    let listener = null
    if (resolveAfterInitialSnapshot) {
      listener = PointsCollection.where(
        "instanceId",
        "==",
        instanceId
      ).onSnapshot(snap => {
        onSnapshot(snap)
        resolve(listener)
      })
    } else {
      listener = PointsCollection.where(
        "instanceId",
        "==",
        instanceId
      ).onSnapshot(onSnapshot)
      resolve(listener)
    }
  })
}
