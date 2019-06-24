import React from "react"

const Rules = () => {
  return (
    <div className="rules">
      <h2>Rules</h2>
      <h3>Who wins?</h3>
      <ul className="normal">
        <li>The team with the most points.</li>
        <li>The two highest scoring members from *each* team.</li>
      </ul>
      <h3>Teams:</h3>
      <ul className="normal">
        <li>Teams must have at minimum 7 members</li>
        <li>
          Each team must have at least a 40/60 split of members of the opposite
          sex. (i.e a team of 10 should have at least 4 guys/girls and 6
          girls/guys)
        </li>
      </ul>
      <h3>How to earn points:</h3>
      <ul className="normal">
        <li>3 pts. per team member present on Wednesday nights</li>
        <li>
          5 pts. per team member present at Theology of the Body on Sunday after
          the 9 a.m. mass
        </li>
        <li>
          2 pts. (additional) per team member who brings their token to an event
        </li>
        <li>
          2 pts. per team member on a winning team in a youth group game (points
          awarded by member, not by team)
        </li>
        <li>
          6 pts. per picture with mascot outside of church property using
          #stjohnssummertimeshowdown on Instagram or emailed to&nbsp;
          <a href="mailto:showdown@light-heart.org">showdown@light-heart.org</a>
          <ul className="normal">
            <li>Min. 3 team members required per picture</li>
            <li>
              2 pts. (additional) per team members in picture above 5 members
            </li>
            <li>Pictures each week must be in different places</li>
            <li>Limit 3 per week</li>
          </ul>
        </li>
        <li>
          25 pts. for a <em>completely</em> correct answer to the memory
          question at the beginning of each Wednesday session (no partial credit
          given)
        </li>
        <li>
          30 pts. per team upon winning a game with *only* team members from the
          same team.
        </li>
      </ul>
      <p>
        <small>
          Note: The team in last place will receive 2x points until their points
          <br />
          >= 10 of the next team.
        </small>
      </p>
    </div>
  )
}

export default Rules
