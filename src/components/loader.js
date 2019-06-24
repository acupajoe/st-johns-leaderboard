import React from "react"

const Loader = ({ fullscreen }) => {
  return (
    <div className={`lds-ring ${fullscreen ? "fullscreen" : ""}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
export default Loader
