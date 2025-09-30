import path from 'node:path'
import { scheduleArray } from '../types/game'
import { readJSONFile } from './readFile'

const currentFilePath = __dirname

const JSONFilePath = currentFilePath.replace('/src/lib', '/json')

export const getSchedule = async (year: number, women: boolean) => {
  const fileName = path.join(
    JSONFilePath,
    `${women ? 'women' : 'men'}_${year}_${year + 1}_schedule.json`,
  )
  const data = await readJSONFile(fileName)
  return scheduleArray.parse(await JSON.parse(data))
}
