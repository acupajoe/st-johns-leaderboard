import React from "react"
import ReactDOM from "react-dom"

import Content from "./content"
import Footer from "./footer"

import "./styles.scss"

function App() {
  return (
    <div className="App">
      <Content />
      <Footer />
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
