import React from "react"

import { GlobalContext } from "../globalContext"

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      isFocused: false
    }
  }

  renderResults() {
    if (!this.state.isFocused || this.state.query.length < 3) return null
    const results = []
    for (const participant of this.context.participants) {
      if (
        participant.fullName
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      ) {
        results.push(
          <li>
            {participant.fullName} ({participant.totalPoints} pts)
          </li>
        )
      }
    }
    return (
      <div className="results">
        <ul>{results.length ? results : <li>No results.</li>}</ul>
      </div>
    )
  }

  handleSearchKeyUp = e =>
    this.setState({ ...this.state, query: e.target.value })
  handleSearchBlur = e => this.setState({ ...this.state, isFocused: false })
  handleSearchFocus = e => this.setState({ ...this.state, isFocused: true })

  render() {
    return (
      <div className="searchbar">
        <input
          name="search"
          type="text"
          placeholder="What's my score?"
          onBlur={this.handleSearchBlur}
          onFocus={this.handleSearchFocus}
          onKeyUp={this.handleSearchKeyUp}
        />
        {this.renderResults()}
      </div>
    )
  }
}

SearchBar.contextType = GlobalContext
export default SearchBar
