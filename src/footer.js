import React from "react"

import "./emoji.scss"

const Footer = () => {
  return (
    <footer>
      <a
        href="https://acupajoe.io?referrer=st-johns-leaderboard"
        target="_blank"
        rel="noopener noreferrer">
        Made by <i class="twa twa-pray twa-lg" />
        ,&nbsp;
        <i class="twa twa-coffee twa-lg" /> and&nbsp;
        <i class="twa twa-sunny twa-lg" />.<br /> Joseph Schultz :{" "}
        {new Date().getFullYear()}.
      </a>
    </footer>
  )
}

export default Footer
