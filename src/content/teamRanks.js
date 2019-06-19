import React from "react"
import { GlobalContext } from "../globalContext"
import { getTeamWithPoints } from "../api"
import Timer from "../timer"

class TeamRanks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
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
    let teams = await getTeamWithPoints()
    teams.sort((a, b) => b.totalPoints - a.totalPoints)
    this.context.setTeams(teams)
    this.setState({ ...this.state, isLoading: false })
  }

  renderTeams() {
    const result = []
    let count = 1
    for (const team of this.context.teams) {
      const item = (
        <li className="team" key={team.name}>
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
          {!this.state.isLoading && this.renderTeams()}
          {this.state.isLoading && this.renderPlaceholders()}
        </div>
      </div>
    )
  }
}

TeamRanks.contextType = GlobalContext
export default TeamRanks
