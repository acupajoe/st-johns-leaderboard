import React from "react"

import Header from "../header"
import CreatePointForm from "./createPointForm"
import PointsList from "./pointsList"

const Points = () => {
  return (
    <div className="Admin">
      <Header />
      <div className="Points">
        <CreatePointForm />
        <PointsList />
      </div>
    </div>
  )
}

export default Points
