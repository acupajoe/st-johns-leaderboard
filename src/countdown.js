import React from "react"
import moment from "moment"

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

const Countdown = () => {
  const date = moment("July 31, 2019 22:59:59 CST")
  let now = moment.duration(date.diff(moment())).asSeconds()
  var parsed = toHHMMSS(now)
  return (
    <div className="countdown">
      {parsed.days}
      <small>days</small>
      {parsed.hours}
      <small>hours</small>
      {parsed.minutes}
      <small>minutes</small>
      {parsed.seconds}
      <small>seconds</small>
    </div>
  )
}

export default Countdown
