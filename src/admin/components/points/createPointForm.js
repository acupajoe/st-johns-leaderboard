import React from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

import { FirebaseContext, PointsCollection } from "../../../firestore"

const InputSwal = withReactContent(Swal)

class CreatePointForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      participantId: null,
      value: null
    }
  }

  handleParticipantSelectChanged = e =>
    this.setState({ ...this.state, participantId: e.target.value })

  handleValueInputChanged = e =>
    this.setState({ ...this.state, value: parseInt(e.target.value) })

  save = async () => {
    if (this.state.participantId === null || this.state.value === 0)
      return false

    const teamId = this.context.participants[this.state.participantId].ref
      .parent.parent.id
    const data = {
      instanceId: this.context.instance.id,
      participantId: this.state.participantId,
      teamId,
      value: this.state.value,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await PointsCollection.add(data)

    this.setState({
      participantId: null,
      value: null
    })

    return result
  }

  getForm = () => {
    const selectItems = []
    const participants = Object.values(this.context.participants).sort((a, b) =>
      a.data().fullName > b.data().fullName ? 1 : -1
    )

    selectItems.push(
      <option key={"none"} value="">
        Select a participant
      </option>
    )

    for (const participant of participants) {
      selectItems.push(
        <option key={participant.id} value={participant.id}>
          {participant.data().fullName}
        </option>
      )
    }

    return (
      <form className="add-point" onSubmit={e => e.preventDefault()}>
        <select
          name="participant"
          onChange={this.handleParticipantSelectChanged}>
          {selectItems}
        </select>
        <input
          name="value"
          type="number"
          min={0}
          placeholder="1"
          onChange={this.handleValueInputChanged}
        />
      </form>
    )
  }

  handleAddPointButtonClick = async () => {
    const result = await InputSwal.fire({
      title: "Add Point",
      html: this.getForm(),
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      showCancelButton: true
    })

    if (result.dismiss) return

    try {
      const isSaved = await this.save()

      if (!isSaved) return

      Swal.fire({
        title: "Created Point",
        toast: true,
        timer: 2500,
        showConfirmButton: false,
        position: "top-end",
        type: "success"
      })
    } catch (e) {
      Swal.fire({
        title: "Error",
        text: e.message,
        toast: true,
        timer: 2500,
        showConfirmButton: false,
        position: "top-end",
        type: "error"
      })
    }
  }

  render() {
    return (
      <button className="btn" onClick={this.handleAddPointButtonClick}>
        Add Point
      </button>
    )
  }
}

CreatePointForm.contextType = FirebaseContext
export default CreatePointForm
