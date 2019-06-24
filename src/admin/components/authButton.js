import React from "react"
import Swal from "sweetalert2"
import WithReactContent from "sweetalert2-react-content"

import firebase from "firebase/app"
import "firebase/auth"

const InputSwal = WithReactContent(Swal)

class AuthButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      isLoggedIn: !!firebase.auth().currentUser
    }
  }

  handleEmailOnKeyup = e =>
    this.setState({ ...this.state, email: e.target.value })
  handlePasswordOnKeyup = e =>
    this.setState({ ...this.state, password: e.target.value })

  handleLoginButtonClick = async () => {
    const result = await InputSwal.fire({
      title: "Login",
      html: this.getForm(),
      confirmButtonText: "Login",
      showCancelButton: true
    })

    if (result.dismiss) return

    const { email, password } = this.state

    if (!email || !password) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "Must provide a username and password",
        toast: true,
        timer: 2500,
        position: "top-end",
        showConfirmButton: false
      })
      return
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)

      this.setState({ email: "", password: "", isLoggedIn: true })

      Swal.fire({
        type: "success",
        title: "Logged In",
        toast: true,
        timer: 2500,
        position: "top-end",
        showConfirmButton: false
      })
    } catch (e) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: e.message,
        toast: true,
        timer: 2500,
        position: "top-end",
        showConfirmButton: false
      })
    }
  }

  handleLogoutButtonClick = () => {
    firebase.auth().signOut()
    this.setState({ email: "", password: "", isLoggedIn: false })
  }

  getForm = () => {
    return (
      <form className="login" onSubmit={e => e.preventDefault()}>
        <input
          type="email"
          onKeyUp={this.handleEmailOnKeyup}
          placeholder="john.doe@example.com"
        />
        <input
          type="password"
          onKeyUp={this.handlePasswordOnKeyup}
          placeholder="password"
        />
      </form>
    )
  }

  getLoginButton = () => (
    <button className="auth" onClick={this.handleLoginButtonClick}>
      Login
    </button>
  )

  getLogoutButton = () => (
    <button className="auth" onClick={this.handleLogoutButtonClick}>
      Logout
    </button>
  )

  render() {
    return this.state.isLoggedIn
      ? this.getLogoutButton()
      : this.getLoginButton()
  }
}

export default AuthButton
