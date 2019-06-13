import React from "react"

import Countdown from "./content/countdown"
import TeamRanks from "./content/team-ranks"
import StudentRanks from "./content/student-ranks"
import RefreshTimer from "./content/refreshTimer"
import Rules from "./content/rules"
import ScavengerHunt from "./content/scavengerHunt"

const Content = () => {
  return (
    <div className="container">
      <header className="main">
        <h2>St. John's 2019</h2>
        <h1>Summertime Showdown</h1>
        <Countdown />
      </header>
      <hr />
      <TeamRanks />
      <hr />
      <StudentRanks />
      <RefreshTimer />
      <hr />
      <Rules />
      <hr />
      <ScavengerHunt />
      <hr />
    </div>
  )
}

export default Content
