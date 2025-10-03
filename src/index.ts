import 'dotenv/config'

import { z } from 'zod'
import { calcResultDistribution } from './lib/calcResultDistribution'
import { calcSeason } from './lib/calcSeason'
import { getEloData } from './lib/getEloData'
import { getNewEloObject } from './lib/getNewEloObject'
import { getSchedule } from './lib/getSchedule'
import { writeELOFile } from './lib/writeFile'
import { TableRecord } from './types/game'

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

    console.log('DONE!')
  } else if (process.env.FUNCTION === 'ResultDistribution') {
    const data = await calcResultDistribution(2025, false)
    console.log(data)
  } else if (process.env.FUNCTION === 'PredictSeason') {
    const t0 = performance.now()
    const table: TableRecord = {}
    const { eloObject } = await getEloData(2025, false)
    const schedule = await getSchedule(2025, false)
    for (let i = 1; i < rounds + 1; i++) {
      const newEloObject = JSON.parse(JSON.stringify(eloObject))
      calcSeason(schedule, newEloObject, table)
    }

    const t1 = performance.now()

    const sortedTable = Object.entries(table)
      .map(([team, points]) => ({
        team,
        points: points / rounds,
      }))
      .sort((a, b) => {
        if (a.points < b.points) return 1
        if (a.points > b.points) return -1
        return 0
      })
    console.log(sortedTable)
    console.log(
      `Call to predict season ${rounds} time(s) took ${(t1 - t0).toFixed(3)} milliseconds.`,
    )
  }
}

main()
