import { calculateExpectedScore } from '@ihs7/ts-elo'
import { getEloData } from './getEloData'
import { getSchedule } from './getSchedule'

const distributionData = {
  '0-119': 0,
  '120-169': 0,
  '170-219': 0,
  '220-259': 0,
  '260-299': 0,
  '300-339': 0,
  '340-379': 0,
  '380-419': 0,
  '420-459': 0,
  '460-489': 0,
  '490-509': 0,
  '510-539': 0,
  '540-579': 0,
  '580-619': 0,
  '620-659': 0,
  '660-699': 0,
  '700-739': 0,
  '740-779': 0,
  '780-829': 0,
  '830-879': 0,
  '880-1000': 0,
}

export const calcResultDistribution = async (year: number, women: boolean) => {
  const schedule = await getSchedule(year, women)
  const { eloObject } = await getEloData(year, women)

  schedule.forEach((game) => {
    const winProbabilityScore = Math.round(
      calculateExpectedScore(eloObject[game.team], eloObject[game.opponent]) *
        1000,
    )

    switch (true) {
      case winProbabilityScore < 120:
        distributionData['0-119'] += 1
        break
      case winProbabilityScore < 170:
        distributionData['120-169'] += 1
        break
      case winProbabilityScore < 220:
        distributionData['170-219'] += 1
        break
      case winProbabilityScore < 260:
        distributionData['220-259'] += 1
        break
      case winProbabilityScore < 300:
        distributionData['260-299'] += 1
        break
      case winProbabilityScore < 340:
        distributionData['300-339'] += 1
        break
      case winProbabilityScore < 380:
        distributionData['340-379'] += 1
        break
      case winProbabilityScore < 420:
        distributionData['380-419'] += 1
        break
      case winProbabilityScore < 460:
        distributionData['420-459'] += 1
        break
      case winProbabilityScore < 490:
        distributionData['460-489'] += 1
        break
      case winProbabilityScore < 510:
        distributionData['490-509'] += 1
        break
      case winProbabilityScore < 540:
        distributionData['510-539'] += 1
        break
      case winProbabilityScore < 580:
        distributionData['540-579'] += 1
        break
      case winProbabilityScore < 620:
        distributionData['580-619'] += 1
        break
      case winProbabilityScore < 660:
        distributionData['620-659'] += 1
        break
      case winProbabilityScore < 700:
        distributionData['660-699'] += 1
        break
      case winProbabilityScore < 740:
        distributionData['700-739'] += 1
        break
      case winProbabilityScore < 780:
        distributionData['740-779'] += 1
        break
      case winProbabilityScore < 830:
        distributionData['780-829'] += 1
        break
      case winProbabilityScore < 880:
        distributionData['830-879'] += 1
        break
      case winProbabilityScore < 1000:
        distributionData['880-1000'] += 1
        break
      default:
        break
    }
  })

  return distributionData
}
