import path from 'node:path'
import { EloObject, eloRecord } from '../types/elo'
import { numberArray } from '../types/numberArray'
import { readJSONFile } from './readFile'

const currentFilePath = __dirname

const EloJSONFilePath = currentFilePath.replace('/src/lib', '/json/elo')

export const getEloData = async (year: number, women: boolean) => {
  let eloObject: EloObject = {}
  if (year === 2007 || (year === 2015 && women)) return { eloObject, min: 1600 }
  const fileName = path.join(
    EloJSONFilePath,
    `elo_${women ? 'women' : 'men'}_${year - 1}_${year}.json`,
  )
  const data = await readJSONFile(fileName)

  eloObject = eloRecord.parse(await JSON.parse(data))

  const eloArray = numberArray.parse(Object.values(eloObject))

  const min = Math.min(...eloArray)
  return { eloObject, min }
}

export const getEloWithSCData = async (women: boolean) => {
  let eloObject: EloObject = {}

  const fileName = path.join(
    EloJSONFilePath,
    `elo_${women ? 'women' : 'men'}_2024_2025.json`,
  )
  const data = await readJSONFile(fileName)

  eloObject = eloRecord.parse(await JSON.parse(data))

  const eloArray = numberArray.parse(Object.values(eloObject))

  const min = Math.min(...eloArray)
  return { eloObject, min }
}
