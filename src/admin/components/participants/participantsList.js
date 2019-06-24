import React from "react"
import { FirebaseContext } from "../../../firestore"

const ParticipantsList = () => {
  const context = React.useContext(FirebaseContext)
  const renderParticipants = () => {
    const result = []
    const participants = Object.values(context.participants).sort(
      (a, b) => b.data().totalPoints - a.data().totalPoints
    )
    for (const participant of participants) {
      const { fullName, totalPoints } = participant.data()
      result.push(
        <tr className="participant" key={participant.id}>
          <td>{fullName}</td>
          <td>{context.teams[participant.ref.parent.parent.id].data().name}</td>
          <td>{totalPoints}</td>
        </tr>
      )
    }
    return result
  }

  return (
    <table className="results">
      <thead>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>{renderParticipants()}</tbody>
    </table>
  )
}

export default ParticipantsList
