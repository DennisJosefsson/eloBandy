import { calculateTeamMatch } from '@ihs7/ts-elo'
import { GameObject } from '../types/game'

export const calcElo = (
  gameObject: GameObject,
  homeRating: number,
  awayRating: number,
) => {
  const homeTeam = {
    players: [{ id: gameObject.team, rating: homeRating }],
    score: gameObject.points,
  }
  const awayTeam = {
    players: [{ id: gameObject.opponent, rating: awayRating }],
    score: gameObject.points === 0 ? 2 : gameObject.points === 1 ? 1 : 2,
  }

  return calculateTeamMatch(homeTeam, awayTeam, { kFactor: 32 })
}
