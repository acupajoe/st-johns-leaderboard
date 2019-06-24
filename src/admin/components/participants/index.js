import React from "react"

import Header from "../header"
import CreateParticipantForm from "./createParticipantForm"
import ParticipantsList from "./participantsList"

const Participants = () => {
  return (
    <div className="Admin">
      <Header />
      <div className="Participants">
        <CreateParticipantForm />
        <ParticipantsList />
      </div>
    </div>
  )
}

export default Participants
