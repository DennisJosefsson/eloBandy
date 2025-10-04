import path from 'node:path'
import { gameArray } from '../types/game'
import { readJSONFile } from './readFile'

const currentFilePath = __dirname

const JSONFilePath = currentFilePath.replace('/src/lib', '/json')

export const getGameArray = async (
  year: number,
  women: boolean,
  sc: boolean = false,
) => {
  const fileName = sc
    ? path.join(JSONFilePath, `${women ? 'women' : 'men'}_2025_2026_sc.json`)
    : path.join(
        JSONFilePath,
        `${women ? 'women' : 'men'}_${year}_${year + 1}.json`,
      )
  const data = await readJSONFile(fileName)
  return gameArray.parse(await JSON.parse(data))
}
