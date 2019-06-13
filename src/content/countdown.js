import React from "react"
import moment from "moment"

import Timer from "../timer"

const toHHMMSS = str => {
  var sec_num = parseInt(str, 10)
  var days = Math.floor(sec_num / 86400)
  var hours = Math.floor((sec_num - days * 86400) / 3600)
  var minutes = Math.floor((sec_num - days * 86400 - hours * 3600) / 60)
  var seconds = sec_num - days * 86400 - hours * 3600 - minutes * 60

  if (days < 10) days = "0" + days
  if (hours < 10) hours = "0" + hours
  if (minutes < 10) minutes = "0" + minutes
  if (seconds < 10) seconds = "0" + seconds
  return { days, hours, minutes, seconds }
}

export default class Countdown extends React.Component {
  constructor(props) {
    super(props)
    this.endDate = moment("July 31, 2019 22:59:59 CST")
    this.state = {
      parsed: { days: "00", hours: "00", minutes: "00", seconds: "00" }
    }
  }

  componentDidMount() {
    Timer.addListener(this.handleTimerInterval, this)
  }

  componentWillUnmount() {
    Timer.removeListener(this.handleTimerInterval)
  }

  handleTimerInterval() {
    const now = moment.duration(this.endDate.diff(moment())).asSeconds()
    this.setState({ ...this.state, parsed: toHHMMSS(now) })
  }

  render() {
    return (
      <div className="countdown">
        {this.state.parsed.days}
        <small>days</small>
        {this.state.parsed.hours}
        <small>hours</small>
        {this.state.parsed.minutes}
        <small>minutes</small>
        {this.state.parsed.seconds}
        <small>seconds</small>
      </div>
    )
  }
}
