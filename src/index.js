import React from "react"
import ReactDOM from "react-dom"

import { GlobalContext } from "./globalContext"

import Content from "./content"
import Footer from "./content/footer"

import "./styles/main.scss"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      global: {
        teams: [],
        setTeams: this.handleSetTeams.bind(this),
        participants: [],
        setParticipants: this.handleSetParticipants.bind(this)
      }
    }
  }

  handleSetTeams = teams => {
    this.setState({ ...this.state, global: { ...this.state.global, teams } })
  }

  handleSetParticipants = participants => {
    this.setState({
      ...this.state,
      global: { ...this.state.global, participants }
    })
  }

  render() {
    return (
      <GlobalContext.Provider value={this.state.global}>
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
