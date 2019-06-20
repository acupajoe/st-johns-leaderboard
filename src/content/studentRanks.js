import React from "react"
import { GlobalContext } from "../globalContext"

import Timer from "../timer"

class StudentRanks extends React.Component {
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

    const participants = Object.values(this.context.participants).sort(
      (a, b) => b.data().totalPoints - a.data().totalPoints
    )

    for (const doc of participants) {
      if (count > 5) break

      const participant = doc.data()
      const teamId = doc.ref.parent.parent.id
      const team = this.context.teams[teamId].data()

      const item = (
        <li className="team" key={doc.id}>
          <label>
            {count}. {participant.fullName} ({participant.totalPoints} pts)
            <small className="float-right">&nbsp;[{team.name}]</small>
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
      <div className="ranks student-ranks">
        <h3>Top 5 Ranked Students</h3>
        <div className="teams">
          {!this.context.isLoading && this.renderStudents()}
          {this.context.isLoading && this.renderPlaceholders()}
        </div>
      </div>
    )
  }
}

StudentRanks.contextType = GlobalContext
export default StudentRanks
