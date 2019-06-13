import React from "react"

import Timer from "../timer"
import { getParticipants } from "../api"

class StudentRanks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      participants: []
    }
  }

  componentDidMount() {
    this.refresh()
    Timer.addRefreshListener(this.refresh, this)
  }

  componentWillUnmount() {
    Timer.removeRefreshListener(this.refresh)
  }

  async refresh() {
    this.setState({ ...this.state, isLoading: true })
    let participants = await getParticipants()
    participants.sort((a, b) => b.totalPoints - a.totalPoints)
    this.setState({ ...this.state, isLoading: false, participants })
  }

  renderPlaceholders() {
    return (
      <ul className="team-list">
        <li className="placeholder" />
        <li className="placeholder" />
        <li className="placeholder" />
        <li className="placeholder" />
        <li className="placeholder" />
      </ul>
    )
  }

  renderStudents() {
    const result = []
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
      result.push(item)
      count++
    }
    return <ul className="student-list">{result}</ul>
  }

  render() {
    return (
      <div className="student-ranks">
        <h3>Top 5 Ranked Students</h3>
        <div className="teams">
          {!this.state.isLoading && this.renderStudents()}
          {this.state.isLoading && this.renderPlaceholders()}
        </div>
      </div>
    )
  }
}

export default StudentRanks
