import React from "react"
import { FirebaseContext } from "../../firestore"
import Axios from "axios"

const phrase = "bring a bible."
const endpoint =
  "https://us-central1-leaderboard-us.cloudfunctions.net/api/hangman"

class Hangman extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPlaying: false,
      canPlay: true,
      participantId: null,
      phrase,
      allowedGuesses: 5,
      wrongGuesses: 0,
      correctGuesses: 0,
      guessed: {},
      valid: phrase
        .toLowerCase()
        .replace(/\s|\.|,/g, "")
        .split("")
        .filter((i, p, s) => s.indexOf(i) === p),
      display: phrase.replace(/\w/g, "_")
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { wrongGuesses, allowedGuesses, correctGuesses, valid } = nextState
    if (wrongGuesses === allowedGuesses) {
      this.handleLostGame()
    } else if (correctGuesses === valid.length) {
      this.handleWonGame()
    }
  }

  handleLostGame = async () => {
    const data = {
      instanceId: this.context.instance.id,
      teamId: this.context.participants[this.state.participantId].ref.parent
        .parent.id,
      participantId: this.state.participantId,
      solution: "invalid"
    }

    await Axios.post(endpoint, data)
  }

  handleWonGame = async () => {
    const data = {
      instanceId: this.context.instance.id,
      teamId: this.context.participants[this.state.participantId].ref.parent
        .parent.id,
      participantId: this.state.participantId,
      solution: phrase
    }
    await Axios.post(endpoint, data)
  }

  handleStartButtonPressed = () => {
    if (this.state.participantId != null)
      this.setState({ ...this.state, isPlaying: true })
  }
  handleParticipantSelectChanged = e => {
    const participantId = e.target.value
    if (this.context.participants[participantId].data().hasAttemptedClue7)
      this.setState({ ...this.state, canPlay: false })
    else this.setState({ ...this.state, participantId: e.target.value })
  }

  handleGuessKeyUp = async e => {
    e.preventDefault()

    // Prevent non-words
    if (/\W|\d/g.test(e.target.value)) {
      e.target.value = ""
    }

    this.guess(e.target.value)
    e.target.value = ""

    return false
  }

  guess = letter => {
    if (this.state.guessed[letter]) return
    const isCorrect = this.state.valid.indexOf(letter) > -1

    if (isCorrect) {
      const guessed = { ...this.state.guessed, [letter]: isCorrect }
      let display = ""
      for (const i in phrase.split("")) {
        display +=
          /\W|\s/.test(phrase[i]) || guessed[phrase[i]] ? phrase[i] : "_"
      }

      this.setState({
        ...this.state,
        guessed,
        display,
        correctGuesses: this.state.correctGuesses + 1
      })
    } else {
      this.setState({
        ...this.state,
        wrongGuesses: this.state.wrongGuesses + 1,
        guessed: { ...this.state.guessed, [letter]: false }
      })
    }
  }

  renderGuesses = () => {
    const result = []

    for (const letter of Object.keys(this.state.guessed)) {
      result.push(
        <li
          className={this.state.guessed[letter] ? "correct" : ""}
          key={letter}>
          {letter}
        </li>
      )
    }

    if (!result.length) result.push(<li key="n/a">None</li>)

    return result
  }

  renderStartGameOverlay = () => {
    return (
      <div className="overlay">
        <h2>Hangman</h2>
        <p>You have 5 wrong guesses available. Be smart!</p>
        <p>
          15 points for solving the puzzle, an additional 10 for bringing your
          item.
        </p>
        <select onChange={this.handleParticipantSelectChanged}>
          <option value="">Select Participant</option>
          {Object.values(this.context.participants)
            .sort((a, b) => (a.data().fullName > b.data().fullName ? 1 : -1))
            .map(v => (
              <option key={v.id} value={v.id}>
                {v.data().fullName}
              </option>
            ))}
        </select>
        <button
          disabled={!this.state.canPlay}
          className="button"
          onClick={this.handleStartButtonPressed}>
          Start Game
        </button>
      </div>
    )
  }

  renderWonGameOverlay = () => {
    return (
      <div className="overlay">
        <h2>You won! Way to go. Points have been awarded to you.</h2>
      </div>
    )
  }

  renderLostGameOverlay = () => {
    return (
      <div className="overlay">
        <h2>You lost. It's okay. Happens to the best of us.</h2>
      </div>
    )
  }

  renderGame = () => {
    const images = require.context("../assets/hangman", true)
    const image = images(`./hangman-${this.state.wrongGuesses}.png`)

    return (
      <div className="game">
        <div className="left">
          <img className="status" src={image} alt="hangman" />
        </div>
        <div className="right">
          <div className="guesses">
            <p>
              Remaining Guesses:{" "}
              {this.state.allowedGuesses - this.state.wrongGuesses}
            </p>
            <p>Guessed:</p>
            <ul>{this.renderGuesses()}</ul>
          </div>
          <div className="layout">
            <p className="sentence">{this.state.display}</p>
            <input
              type="text"
              maxLength="1"
              placeholder="Press here to Guess"
              onChange={this.handleGuessKeyUp}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (!this.state.isPlaying) {
      return <div className="hangman">{this.renderStartGameOverlay()}</div>
    } else if (this.state.wrongGuesses === this.state.allowedGuesses) {
      return <div className="hangman">{this.renderLostGameOverlay()}</div>
    } else if (this.state.correctGuesses === this.state.valid.length) {
      return <div className="hangman">{this.renderWonGameOverlay()}</div>
    } else {
      return <div className="hangman">{this.renderGame()}</div>
    }
  }
}

Hangman.contextType = FirebaseContext
export default Hangman
