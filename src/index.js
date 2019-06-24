import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"

import {
  FirebaseContext,
  createTeamsListener,
  createInstanceListener,
  createPointsListener,
  createParticipantListener
} from "./firestore"

import Loader from "./components/loader"
import Client from "./client"
import Points from "./admin/components/points"
import Participants from "./admin/components/participants"

import "./styles/main.scss"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.listeners = []
    this.state = {
      isLoading: false,
      firebase: {
        instance: {},
        teams: {},
        participants: {},
        points: {}
      }
    }
  }

  componentWillMount() {
    this.registerListeners()
  }

  componentWillUnmount() {
    this.deregisterListeners()
  }

  deregisterListeners = () => {
    for (const listener of this.listeners) {
      listener()
    }
    this.listeners = []
  }

  registerListeners = async () => {
    this.setState({ ...this.state, isLoading: true })
    this.deregisterListeners()
    const instanceListener = await createInstanceListener(
      `leaderboard.light-heart.org`,
      this.handleInstanceSnapshot.bind(this)
    )
    const teamsListener = await createTeamsListener(
      this.state.firebase.instance.id,
      this.handleTeamsSnapshot.bind(this)
    )

    await this.createParticipantListeners()

    const pointsListener = await createPointsListener(
      this.state.firebase.instance.id,
      this.handlePointsSnapshot.bind(this)
    )

    for (const listener of [instanceListener, teamsListener, pointsListener])
      this.listeners.push(listener)

    this.setState({ ...this.state, isLoading: false })
  }

  createParticipantListeners = async () => {
    const listeners = []
    for (const team of Object.values(this.state.firebase.teams)) {
      const listener = await createParticipantListener(
        team.id,
        this.handleParticipantsSnapshot.bind(this)
      )
      listeners.push(listener)
    }
    this.listeners.concat(listeners)
  }

  handleInstanceSnapshot = snap => {
    if (!snap.empty) {
      this.setState({
        ...this.state,
        firebase: { ...this.state.firebase, instance: snap.docs[0] }
      })
    }
  }

  handleFirestoreSnapshot = (key, snap) => {
    const result = {}
    for (const change of snap.docChanges()) {
      switch (change.type) {
        case "removed":
          const newState = { ...this.state }
          console.log(newState.firebase[key][change.doc.id])
          delete newState.firebase[key][change.doc.id]
          console.log(newState.firebase[key][change.doc.id])
          this.setState(newState)
          break
        default:
          result[change.doc.id] = change.doc
          break
      }
    }
    if (Object.keys(result).length) {
      this.setState({
        ...this.state,
        firebase: {
          ...this.state.firebase,
          [key]: { ...this.state.firebase[key], ...result }
        }
      })
    }
  }

  handleTeamsSnapshot = snap => this.handleFirestoreSnapshot("teams", snap)
  handlePointsSnapshot = snap => this.handleFirestoreSnapshot("points", snap)
  handleParticipantsSnapshot = snap =>
    this.handleFirestoreSnapshot("participants", snap)

  render() {
    if (this.state.isLoading) {
      return (
        <div className="App">
          <Loader fullscreen />
        </div>
      )
    } else {
      return (
        <Router>
          <FirebaseContext.Provider value={this.state.firebase}>
            <div className="App">
              <Route path="/" exact={true} component={Client} />
              <Route path="/admin" exact={true} component={Points} />
              <Route path="/admin/participants" component={Participants} />
            </div>
          </FirebaseContext.Provider>
        </Router>
      )
    }
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
