import { calculateTeamMatch } from '@ihs7/ts-elo'
import { z } from 'zod'
import { GameObject } from '../types/game'

const kFactor = z.coerce.number().parse(process.env.KFACTOR)

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
    score: gameObject.points === 0 ? 2 : gameObject.points === 1 ? 1 : 0,
  }

  return calculateTeamMatch(homeTeam, awayTeam, { kFactor: kFactor })
}
