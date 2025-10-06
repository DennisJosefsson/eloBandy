import { calculateExpectedScore, calculateTeamMatch } from '@ihs7/ts-elo'
import { z } from 'zod'
import { EloObject } from '../types/elo'
import { ScheduleArray, TableRecord, TeamPlacings } from '../types/game'
import { getPoints, getResultArray } from './getPoints'

const kFactor = z.coerce.number().parse(process.env.KFACTOR)

type SeasonTable = { team: string; points: number }[]

export const calcSeason = (
  schedule: ScheduleArray,
  eloObject: EloObject,
  table: TableRecord,
  teamPlacings: TeamPlacings,
) => {
  const seasonTable: SeasonTable = []

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
    const teamIndex = seasonTable.findIndex((t) => t.team === game.team)
    if (teamIndex === -1) {
      seasonTable.push({ team: game.team, points: points })
    } else {
      seasonTable[teamIndex].points += points
    }
    const opponentIndex = seasonTable.findIndex((t) => t.team === game.opponent)
    if (opponentIndex === -1) {
      seasonTable.push({
        team: game.opponent,
        points: points === 0 ? 2 : points === 1 ? 1 : 0,
      })
    } else {
      seasonTable[opponentIndex].points +=
        points === 0 ? 2 : points === 1 ? 1 : 0
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

  seasonTable
    .sort((a, b) => {
      if (a.points < b.points) return 1
      if (a.points > b.points) return -1
      return 0
    })
    .forEach((team, index) => {
      const existingTeam = teamPlacings.find((t) => t.team === team.team)
      if (existingTeam) {
        existingTeam.placings.push(index + 1)
      } else {
        teamPlacings.push({ team: team.team, placings: [index + 1] })
      }
    })
  return
}
