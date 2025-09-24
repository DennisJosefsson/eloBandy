import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { EloObject } from '../types/elo'

const currentFilePath = __dirname

const JSONFilePath = currentFilePath.replace('/src/lib', '/json/elo')

export const writeELOFile = async (
  eloObject: EloObject,
  year: number,
  women: boolean,
) => {
  const fileName = path.join(
    JSONFilePath,
    `elo_${women ? 'women' : 'men'}_${year}_${year + 1}.json`,
  )
  try {
    await writeFile(fileName, JSON.stringify(eloObject), 'utf8')
    return
  } catch (error) {
    console.error(`Error reading ${fileName}: ${error}`)
    return []
  }
}
