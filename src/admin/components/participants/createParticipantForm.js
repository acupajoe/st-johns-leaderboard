import React from "react"
import { FirebaseContext, TeamsCollection } from "../../../firestore"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const InputSwal = withReactContent(Swal)

class CreateParticipantForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: "",
      teamId: null,
      email: "",
      phone: ""
    }
  }

  save = async () => {
    const { fullName, teamId, email, phone } = this.state
    if (fullName === "" || teamId === "") return false

    const result = await TeamsCollection.doc(teamId)
      .collection(`participants`)
      .add({
        fullName,
        email,
        phone,
        points: {},
        createdAt: new Date(),
        updatedAt: new Date()
      })

    this.setState({
      fullName: "",
      teamId: null,
      email: "",
      phone: ""
    })

    return result
  }

  handleFullNameKeyup = e =>
    this.setState({ ...this.state, fullName: e.target.value })
  handleEmailKeyup = e =>
    this.setState({ ...this.state, email: e.target.value })
  handlePhoneKeyup = e =>
    this.setState({ ...this.state, phone: e.target.value })
  handleSelectChange = e =>
    this.setState({ ...this.state, teamId: e.target.value })

  renderTeamOptions = () => {
    const result = []
    const teams = Object.values(this.context.teams).sort((a, b) =>
      a.data().name > b.data.name ? 1 : -1
    )
    result.push(
      <option key={"n/a"} value="">
        Select a Team
      </option>
    )
    for (const team of teams) {
      result.push(
        <option key={team.id} value={team.id}>
          {team.data().name}
        </option>
      )
    }
    return result
  }

  handleAddbuttonClicked = async () => {
    const result = await InputSwal.fire({
      title: "Add Participant",
      html: this.getForm(),
      confirmButtonText: "Save",
      showCancelButton: true
    })

    if (result.dismiss) return

    try {
      const isSaved = await this.save()

      if (!isSaved) return

      Swal.fire({
        title: "Created Participant",
        toast: true,
        type: "success",
        position: "top-end",
        timer: 2500,
        showConfirmButton: false
      })
    } catch (e) {
      Swal.fire({
        title: "Error",
        text: e.message,
        toast: true,
        type: "error",
        position: "top-end",
        timer: 2500,
        showConfirmButton: false
      })
    }
  }

  getForm = () => {
    return (
      <form className="add-participant" onSubmit={e => e.preventDefault()}>
        <input
          name="fullName"
          placeholder="John Doe"
          type="text"
          onKeyUp={this.handleFullNameKeyup}
        />
        <input
          name="email"
          placeholder="john.doe@gmail.com"
          type="email"
          onKeyUp={this.handleEmailKeyup}
        />
        <input
          name="phone"
          placeholder="444-444-4444"
          type="text"
          onKeyUp={this.handlePhoneKeyup}
        />
        <select name="team" onChange={this.handleSelectChange}>
          {this.renderTeamOptions()}
        </select>
      </form>
    )
  }

  render() {
    return (
      <button className="btn" onClick={this.handleAddbuttonClicked}>
        Add Participant
      </button>
    )
  }
}

CreateParticipantForm.contextType = FirebaseContext
export default CreateParticipantForm
