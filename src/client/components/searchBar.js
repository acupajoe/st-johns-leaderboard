import React from "react"
import { FirebaseContext } from "../../firestore"

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
    const found = Object.values(this.context.participants).filter(p =>
      p
        .data()
        .fullName.toLowerCase()
        .includes(this.state.query.toLowerCase())
    )
    for (const doc of found) {
      const participant = doc.data()
      results.push(
        <li key={doc.id}>
          {participant.fullName} ({participant.totalPoints} pts)
        </li>
      )
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
          disabled={Object.keys(this.context.participants).length === 0}
          onBlur={this.handleSearchBlur}
          onFocus={this.handleSearchFocus}
          onKeyUp={this.handleSearchKeyUp}
        />
        {this.renderResults()}
      </div>
    )
  }
}

SearchBar.contextType = FirebaseContext
export default SearchBar
