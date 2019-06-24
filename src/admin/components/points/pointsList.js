import React from "react"
import { FirebaseContext, PointsCollection } from "../../../firestore"

class PointsList extends React.Component {
  handleDeletePressed = async e => {
    await PointsCollection.doc(e.target.getAttribute("data-id")).delete()
  }

  render() {
    const results = []
    const points = Object.values(this.context.points).sort((a, b) =>
      b.data().createdAt > a.data().createdAt ? 1 : -1
    )

    for (const point of points) {
      const participant = this.context.participants[point.data().participantId]
      if (!participant) continue

      const date =
        typeof point.data().createdAt === "string"
          ? new Date(point.data().createdAt)
          : point.data().createdAt.toDate()
      results.push(
        <tr className="point" key={point.id}>
          <td>{participant.data().fullName}</td>
          <td>{point.data().type}</td>
          <td>{point.data().value} pts.</td>
          <td>{date.toLocaleString()}</td>
          <td>
            <button
              className="delete"
              data-id={point.id}
              onClick={this.handleDeletePressed}>
              X
            </button>
          </td>
        </tr>
      )
    }

    return (
      <table className="results">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Type</th>
            <th>Points</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{results}</tbody>
      </table>
    )
  }
}

PointsList.contextType = FirebaseContext
export default PointsList
