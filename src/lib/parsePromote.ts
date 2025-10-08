import { getGameArray } from './getGameArray'

const women = true
let curr: string[] = []
let old: string[] = []

type Season = `${number}/${number}`

export const promotedRecord: Record<Season, string[]> = {}

export const parsePromote = async () => {
  for (let year = 2015; year < 2025; year++) {
    const promoted: string[] = []
    const gameArray = await getGameArray(year, women)
    curr = [...new Set(gameArray.map((team) => team.team))]
    curr.forEach((team) => {
      if (old.findIndex((t) => t === team) === -1) {
        promoted.push(team)
      }
    })
    // if (year > 2014) {
    //   women = true
    //   const gameArray = await getGameArray(year, women)
    //   curr = [...new Set(gameArray.map((team) => team.team))]
    //   curr.forEach((team) => {
    //     if (old.findIndex((t) => t === team) === -1) {
    //       promoted.push(team)
    //     }
    //   })
    //   women = false
    // }
    promotedRecord[`${year}/${year + 1}`] = promoted
    old = curr
  }
  return promotedRecord
}
