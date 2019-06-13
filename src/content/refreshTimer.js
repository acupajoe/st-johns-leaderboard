import React from "react"

import Timer from "../timer"

class RefreshTimer extends React.Component {
  constructor(props) {
    super(props)
    this.refreshRate = 60 //seconds
    this.state = {
      count: this.refreshRate
    }
  }

  componentDidMount() {
    Timer.addListener(this.handleTimerInterval, this)
  }

  componentWillUnmount() {
    Timer.removeListener(this.handleTimerInterval)
  }

  handleTimerInterval() {
    if (this.state.count === 0) {
      this.setState({ ...this.state, count: this.refreshRate })
      Timer.triggerRefresh()
    } else {
      this.setState({ ...this.state, count: this.state.count - 1 })
    }
  }

  render() {
    return (
      <p className="align-right">
        <small>Will refresh in {this.state.count} sec.</small>
      </p>
    )
  }
}

export default RefreshTimer
