import React from "react"

import Countdown from "./content/countdown"
import SearchBar from "./content/searchBar"
import TeamRanks from "./content/teamRanks"
import StudentRanks from "./content/studentRanks"
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
      <SearchBar />
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
