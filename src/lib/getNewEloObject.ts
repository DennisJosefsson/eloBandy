import { calcElo } from './calcElo'
import { getEloData } from './getEloData'
import { getGameArray } from './getGameArray'

export const getNewEloObject = async (year: number, women: boolean) => {
  const { eloObject, min } = await getEloData(year, women)
  //console.log(eloObject, min)
  const gameArray = await getGameArray(year, women)

  gameArray.forEach((game) => {
    const newElo = calcElo(
      game,
      eloObject[game.team] ?? min,
      eloObject[game.opponent] ?? min,
    )
    eloObject[newElo[0].id] = newElo[0].newRating
    eloObject[newElo[1].id] = newElo[1].newRating
  })

  return eloObject
}
