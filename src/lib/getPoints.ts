import { resultArrayObject } from './constructResultArrays'

export const getResultArray = (probability: number) => {
  const winProbabilityScore = Math.round(probability * 1000)
  switch (true) {
    case winProbabilityScore < 120:
      return resultArrayObject['0-119']

    case winProbabilityScore < 170:
      return resultArrayObject['120-169']

    case winProbabilityScore < 220:
      return resultArrayObject['170-219']

    case winProbabilityScore < 260:
      return resultArrayObject['220-259']

    case winProbabilityScore < 300:
      return resultArrayObject['260-299']

    case winProbabilityScore < 340:
      return resultArrayObject['300-339']

    case winProbabilityScore < 380:
      return resultArrayObject['340-379']

    case winProbabilityScore < 420:
      return resultArrayObject['380-419']

    case winProbabilityScore < 460:
      return resultArrayObject['420-459']

    case winProbabilityScore < 490:
      return resultArrayObject['460-489']

    case winProbabilityScore < 510:
      return resultArrayObject['490-509']

    case winProbabilityScore < 540:
      return resultArrayObject['510-539']

    case winProbabilityScore < 580:
      return resultArrayObject['540-579']

    case winProbabilityScore < 620:
      return resultArrayObject['580-619']

    case winProbabilityScore < 660:
      return resultArrayObject['620-659']

    case winProbabilityScore < 700:
      return resultArrayObject['660-699']

    case winProbabilityScore < 740:
      return resultArrayObject['700-739']

    case winProbabilityScore < 780:
      return resultArrayObject['740-779']

    case winProbabilityScore < 830:
      return resultArrayObject['780-829']

    case winProbabilityScore < 880:
      return resultArrayObject['830-879']

    case winProbabilityScore < 1000:
      return resultArrayObject['880-1000']

    default:
      throw new Error('Switch statement error resultArrayObject')
  }
}

export const getPoints = (probability: number, resultArray: number[]) => {
  const index = Math.floor(probability * 100)
  return resultArray[index]
}
