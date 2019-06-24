import React from "react"

import "../styles/emoji.scss"

const Footer = () => {
  return (
    <footer>
      <a
        href="https://acupajoe.io?referrer=st-johns-leaderboard"
        target="_blank"
        rel="noopener noreferrer">
        Made by <i className="twa twa-pray twa-lg" />
        ,&nbsp;
        <i className="twa twa-coffee twa-lg" /> and&nbsp;
        <i className="twa twa-sunny twa-lg" />.<br /> Joseph Schultz :{" "}
        {new Date().getFullYear()}.
      </a>
    </footer>
  )
}

export default Footer
