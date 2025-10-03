import { calculateExpectedScore, calculateTeamMatch } from '@ihs7/ts-elo'
import { z } from 'zod'
import { EloObject } from '../types/elo'
import { ScheduleArray, TableRecord } from '../types/game'
import { getPoints, getResultArray } from './getPoints'

const kFactor = z.coerce.number().parse(process.env.KFACTOR)

export const calcSeason = (
  schedule: ScheduleArray,
  eloObject: EloObject,
  table: TableRecord,
) => {
  schedule.forEach((game) => {
    const winProb = calculateExpectedScore(
      eloObject[game.team],
      eloObject[game.opponent],
    )
    const resultArray = getResultArray(winProb)
    const points = getPoints(Math.random(), resultArray)
    if (table[game.team]) {
      table[game.team] += points
    } else {
      table[game.team] = points
    }
    if (table[game.opponent]) {
      table[game.opponent] += points === 0 ? 2 : points === 1 ? 1 : 0
    } else {
      table[game.opponent] = points === 0 ? 2 : points === 1 ? 1 : 0
    }

    const homeTeam = {
      players: [{ id: game.team, rating: eloObject[game.team] }],
      score: points,
    }
    const awayTeam = {
      players: [{ id: game.opponent, rating: eloObject[game.opponent] }],
      score: points === 0 ? 2 : points === 1 ? 1 : 0,
    }

    const newElo = calculateTeamMatch(homeTeam, awayTeam, { kFactor: kFactor })
    eloObject[game.team] = newElo[0].newRating
    eloObject[game.opponent] = newElo[1].newRating
  })
  return
}
