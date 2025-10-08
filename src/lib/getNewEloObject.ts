import { calcElo } from './calcElo'
import { getEloData, getEloWithSCData } from './getEloData'
import { getGameArray } from './getGameArray'
import { promoted } from './promoted'

export const getNewEloObject = async (
  year: number,
  women: boolean,
  sc: boolean = false,
) => {
  const { eloObject, min } = sc
    ? await getEloWithSCData(women)
    : await getEloData(year, women)

  const gameArray = await getGameArray(year, women, sc)

  const teamIdArray = gameArray.map((team) => team.team)
  const promotedArray = promoted[`${year}/${year + 1}`].filter((t) =>
    teamIdArray.includes(t),
  )

  promotedArray.forEach((team) => {
    eloObject[team] = min
  })
  gameArray.forEach((game) => {
    const teamElo = eloObject[game.team]
    const opponentElo = eloObject[game.opponent]

    const newElo = calcElo(game, teamElo, opponentElo)
    eloObject[newElo[0].id] = newElo[0].newRating
    eloObject[newElo[1].id] = newElo[1].newRating
  })

  return eloObject
}
