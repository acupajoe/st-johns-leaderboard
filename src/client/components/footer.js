import React from "react"

import { Link } from "react-router-dom"

import "../styles/emoji.scss"

const Footer = () => {
  return (
    <footer>
      <a
        href="https://acupajoe.io?referrer=st-johns-leaderboard"
        target="_blank"
        rel="noopener noreferrer">
        Made by{" "}
        <Link to="/admin">
          <i className="twa twa-pray twa-lg" />
        </Link>
        ,&nbsp;
        <i className="twa twa-coffee twa-lg" /> and&nbsp;
        <i className="twa twa-sunny twa-lg" />.<br /> Joseph Schultz :{" "}
        {new Date().getFullYear()}.
      </a>
    </footer>
  )
}

export default Footer
