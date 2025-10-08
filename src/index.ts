import 'dotenv/config'

import { z } from 'zod'
import { calcResultDistribution } from './lib/calcResultDistribution'
import { calcSeason } from './lib/calcSeason'
import { getEloData } from './lib/getEloData'
import { getNewEloObject } from './lib/getNewEloObject'
import { getSchedule } from './lib/getSchedule'
import { parsePromote } from './lib/parsePromote'
import { readJSONFile } from './lib/readFile'
import { swedify } from './lib/swedify'
import { writeELOFile } from './lib/writeFile'
import { TableRecord, TeamPlacings } from './types/game'

let women = false

const rounds = z.coerce.number().parse(process.env.ROUNDS)

async function main() {
  if (process.env.FUNCTION === 'CalcElo') {
    for (let year = 2007; year < 2025; year++) {
      const eloObject = await getNewEloObject(year, women)
      await writeELOFile(eloObject, year, women)
      if (year > 2014) {
        women = true
        const eloObject = await getNewEloObject(year, women)
        await writeELOFile(eloObject, year, women)
        women = false
      }
    }
    const men2025EloObject = await getNewEloObject(2025, false, true)
    await writeELOFile(men2025EloObject, 2025, false)

    const women2025EloObject = await getNewEloObject(2025, true, true)
    await writeELOFile(women2025EloObject, 2025, true)

    console.log('DONE!')
  } else if (process.env.FUNCTION === 'ResultDistribution') {
    const data = await calcResultDistribution(2026, false)
    console.log(data)
  } else if (process.env.FUNCTION === 'PredictSeason') {
    // const women = true
    const t0 = performance.now()
    const table: TableRecord = {}
    const teamPlacings: TeamPlacings = []
    const { eloObject } = await getEloData(2026, women)
    const schedule = await getSchedule(2025, women)
    for (let i = 1; i < rounds + 1; i++) {
      const newEloObject = JSON.parse(JSON.stringify(eloObject))
      calcSeason(schedule, newEloObject, table, teamPlacings)
    }

    const t1 = performance.now()
    const teamNamesData = await readJSONFile('./json/team_names.json')
    const teamNames = z
      .array(z.object({ casual_name: z.string(), team_id: z.coerce.string() }))
      .parse(JSON.parse(teamNamesData))

    const output = teamPlacings
      .map((team) => {
        const points = table[team.team] / rounds
        const avg = team.placings.reduce((acc, curr) => acc + curr, 0) / rounds
        const min = Math.min(...team.placings)
        const minTimes = team.placings.filter((place) => place === min)?.length
        const max = Math.max(...team.placings)
        const maxTimes = team.placings.filter((place) => place === max)?.length
        const teamName = teamNames.find(
          (t) => t.team_id === team.team,
        )?.casual_name

        const filler = new Array(
          19 - (teamName === undefined ? 0 : teamName.length),
        ).join('\u0020')
        const outputString = `\x1b[34m${teamName}\x1b[0m${filler}Snittplacering: \x1b[33m${swedify(avg)}\x1b[0m    Snittpoäng: \x1b[33m${swedify(points)}\x1b[0m
                  Högsta placering: \x1b[33m${min}\x1b[0m, totalt \x1b[33m${swedify(minTimes)}\x1b[0m gång(er).    Lägsta placering: \x1b[33m${max}\x1b[0m, totalt \x1b[33m${swedify(maxTimes)}\x1b[0m gång(er).
        `

        return { points, outputString }
      })
      .sort((a, b) => {
        if (a.points < b.points) return 1
        if (a.points > b.points) return -1
        return 0
      })

    output.forEach((team) => {
      console.info(team.outputString)
    })
    console.log(
      `Säsongen förutspåddes \x1b[33m${swedify(rounds)}\x1b[0m gång(er) och det tog \x1b[33m${t1 - t0 > 1000 ? swedify((t1 - t0) / 1000) : swedify(t1 - t0)}\x1b[0m ${t1 - t0 > 1000 ? 'sekunder' : 'millisekunder'}.`,
    )
  } else if (process.env.FUNCTION === 'ParsePromoted') {
    const promoted = await parsePromote()
    console.log(promoted)
  }
}

main()
