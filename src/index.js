import React from "react"
import ReactDOM from "react-dom"
import { GlobalContext } from "./globalContext"
import { InstanceCollection, TeamsCollection, PointsCollection } from "./db"

import Content from "./content"
import Footer from "./content/footer"

import "./styles/main.scss"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.listeners = []
    this.state = {
      isLoading: true,
      instance: {},
      teams: {},
      participants: {},
      points: {}
    }
  }

  componentDidMount() {
    this.registerListeners()
  }

  componentWillUnmount() {
    this.unregisterListeners()
  }

  registerListeners = async () => {
    this.setState({ ...this.state, isLoading: true })
    await this.setInstance()
    this.registerInstanceListener()
    await this.registerTeamsListener()
    await this.registerPointsListener()
    await this.setParticipants()
    this.setState({ ...this.state, isLoading: false })
  }

  setInstance = async () => {
    const instances = await InstanceCollection.where(
      "domain",
      "==",
      "leaderboard.light-heart.org"
    ).get()

    if (instances.empty) {
      console.error(`Unable to find registered instance. No data available.`)
      return
    }

    this.setState({
      ...this.state,
      instance: instances.docs[0]
    })
  }
  registerInstanceListener = async () => {
    const listener = InstanceCollection.doc(this.state.instance.id).onSnapshot(
      doc => {
        this.setState({ ...this.state, instance: doc })
      }
    )
    this.listeners.push(listener)
  }

  registerTeamsListener = () => {
    return new Promise((resolve, reject) => {
      const listener = TeamsCollection.where(
        "instanceId",
        "==",
        this.state.instance.id
      ).onSnapshot(snapshot => {
        const teams = {}
        for (const change of snapshot.docChanges()) {
          switch (change.type) {
            case "added":
            case "modifed":
              teams[change.doc.id] = change.doc
              break
            default:
              const newState = { ...this.state }
              delete newState.teams[change.doc.id]
              this.setState(newState)
              break
          }
        }
        if (Object.keys(teams).length) this.setState({ ...this.state, teams })
        resolve()
      })
      this.listeners.push(listener)
    })
  }

  setParticipants = async () => {
    const temp = {}
    for (const team of Object.values(this.state.teams)) {
      const participants = await team.ref.collection("participants").get()
      for (const participant of participants.docs) {
        temp[participant.id] = participant
      }
      this.setState({ ...this.state, participants: temp })
    }
  }

  registerPointsListener = () => {
    return new Promise((resolve, reject) => {
      const listener = PointsCollection.where(
        "instanceId",
        "==",
        this.state.instance.id
      ).onSnapshot(snapshot => {
        const points = {}
        for (const change of snapshot.docChanges()) {
          switch (change.type) {
            case "added":
            case "modifed":
              points[change.doc.id] = change.doc
              break
            default:
              const newState = { ...this.state }
              delete newState.points[change.doc.id]
              this.setState(newState)
              break
          }
        }

        if (Object.keys(points).length) this.setState({ ...this.state, points })

        resolve()
      })
      this.listeners.push(listener)
    })
  }

  unregisterListeners = () => {
    for (const listener of this.listeners) {
      listener()
    }
  }

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        <div className="App">
          <Content />
          <Footer />
        </div>
      </GlobalContext.Provider>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
