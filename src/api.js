import axios from "axios"

const API_URL = `https://strapi.light-heart.org`
const TEAMS_URL = `${API_URL}/teams`
const PARTICIPANTS_URL = `${API_URL}/participants`

export const getTeams = async () => {
  const teamsById = {}
  const response = await axios.get(TEAMS_URL)
  for (const team of response.data) {
    team.totalPoints = 0
    if (team.avatar) {
      team.avatar.url = API_URL + team.avatar.url
    }
    teamsById[team.id] = team
  }
  return teamsById
}

export const getTeamWithPoints = async () => {
  const teamsById = await getTeams()
  const response = await axios.get(PARTICIPANTS_URL)
  for (const participant of response.data) {
    for (const point of participant.points) {
      if (!participant.team || !participant.team.id) continue;
      teamsById[participant.team.id].totalPoints += point.value
      teamsById[participant.team.id].points.push(point)
    }
  }
  return Object.values(teamsById)
}

export const getParticipants = async () => {
  const response = await axios.get(PARTICIPANTS_URL)
  const participants = []
  for (const participant of response.data) {
    participant.totalPoints = 0
    for (const point of participant.points) {
      participant.totalPoints += point.value
    }
    participants.push(participant)
  }
  return participants
}
