import { calcElo } from './calcElo'
import { getEloData, getEloWithSCData } from './getEloData'
import { getGameArray } from './getGameArray'

export const getNewEloObject = async (
  year: number,
  women: boolean,
  sc: boolean = false,
) => {
  const { eloObject, min } = sc
    ? await getEloWithSCData(women)
    : await getEloData(year, women)

  const gameArray = await getGameArray(year, women, sc)

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
