import React from "react"
import { FirebaseContext } from "../../firestore"

class TeamRanks extends React.Component {
  renderTeams() {
    const result = []
    let count = 1
    const teams = Object.values(this.context.teams).sort(
      (a, b) => b.data().totalPoints - a.data().totalPoints
    )
    for (const doc of teams) {
      const team = doc.data()
      const item = (
        <li className="team" key={doc.id}>
          <label>
            {count}. {team.name} ({team.totalPoints} pts)
          </label>
          <div className="members" />
        </li>
      )
      result.push(item)
      count++
    }
    return <ul className="team-list">{result}</ul>
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

  render() {
    return (
      <div className="ranks team-ranks">
        <h3>Team Ranks</h3>
        <div className="teams">
          {!this.context.isLoading && this.renderTeams()}
          {this.context.isLoading && this.renderPlaceholders()}
        </div>
      </div>
    )
  }
}

TeamRanks.contextType = FirebaseContext
export default TeamRanks
