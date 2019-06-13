import React from "react"

import Countdown from "./countdown"
import Rules from "./rules"
import ScavengerHunt from "./scavengerHunt"

import { getTeamWithPoints, getParticipants } from "./api"

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.timerInterval = null
    this.state = {
      teams: [],
      participants: [],
      timer: 60,
      isLoading: true
    }
  }

  componentDidMount() {
    this.setData()
    setInterval(this.handleTimerInterval.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  async handleTimerInterval() {
    if (this.state.timer === 0) {
      await this.setData()
      this.setState({ ...this.state, timer: 60 })
    } else {
      this.setState({ ...this.state, timer: this.state.timer - 1 })
    }
  }

  async setData() {
    this.setState({ ...this.state, isLoading: true })
    let teams = await getTeamWithPoints()
    let participants = await getParticipants()
    teams.sort((a, b) => b.totalPoints - a.totalPoints)
    participants.sort((a, b) => b.totalPoints - a.totalPoints)
    this.setState({ ...this.state, teams, participants, isLoading: false })
  }

  renderTeams() {
    const teams = []
    let count = 1
    for (const team of this.state.teams) {
      const item = (
        <li className="team" key={team.name}>
          <label>
            {count}. {team.name} ({team.totalPoints} pts)
          </label>
          <div className="members" />
        </li>
      )
      teams.push(item)
      count++
    }
    return <ul className="team-list">{teams}</ul>
  }

  renderStudents() {
    const participants = []
    let count = 1
    for (const participant of this.state.participants) {
      if (count > 5) break
      const item = (
        <li className="team" key={participant.id}>
          <label>
            {count}. {participant.fullName} ({participant.totalPoints} pts)
            <small className="float-right">
              &nbsp;[{participant.team.name}]
            </small>
          </label>
          <div className="members" />
        </li>
      )
      participants.push(item)
      count++
    }
    return <ul className="student-list">{participants}</ul>
  }

  renderPlaceholders() {
    return (
      <ul className="team-list">
        <li className="placeholder" />
        <li className="placeholder" />
      </ul>
    )
  }

  render() {
    return (
      <div className="container">
        <header className="main">
          <h2>St. John's 2019</h2>
          <h1>Summertime Showdown</h1>
          <Countdown />
        </header>
        <hr />
        <div className="rank">
          <h3>Team Ranks</h3>
          <div className="teams">
            {!this.state.isLoading && this.renderTeams()}
            {this.state.isLoading && this.renderPlaceholders()}
          </div>
        </div>
        <hr />
        <div className="rank">
          <h3>Top 5 Ranked Students</h3>
          <div className="teams">
            {!this.state.isLoading && this.renderStudents()}
            {this.state.isLoading && this.renderPlaceholders()}
          </div>
        </div>
        <p className="align-right">
          <small>Will refresh in {this.state.timer} sec.</small>
        </p>
        <hr />
        <Rules />
        <hr />
        <ScavengerHunt />
        <hr />
      </div>
    )
  }
}
