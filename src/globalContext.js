import React from "react"

export const GlobalContext = React.createContext({
  teams: [],
  setTeams: () => {},
  participants: [],
  setParticipants: () => {}
})
