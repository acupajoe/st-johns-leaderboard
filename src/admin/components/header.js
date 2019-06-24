import React from "react"
import { Link } from "react-router-dom"
import AuthButton from "./authButton"
import "../styles/main.scss"

const Header = () => {
  return (
    <header>
      <AuthButton />
      <h1>Administration</h1>
      <nav>
        <Link to="/admin/">Points</Link>
        <Link to="/admin/participants">Participants</Link>
      </nav>
    </header>
  )
}

export default Header
