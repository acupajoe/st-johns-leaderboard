import React from "react"

import Countdown from "./components/countdown"
import SearchBar from "./components/searchBar"
import TeamRanks from "./components/teamRanks"
import StudentRanks from "./components/studentRanks"
import Rules from "./components/rules"
import ScavengerHunt from "./components/scavengerHunt"
import Footer from "./components/footer"

import "./styles/main.scss"

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
      <hr />
      <Rules />
      <hr />
      <ScavengerHunt />
      <hr />
      <Footer />
    </div>
  )
}

export default Content
