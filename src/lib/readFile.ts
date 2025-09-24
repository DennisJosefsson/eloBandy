import { readFile } from 'node:fs/promises'
//import path from 'node:path'
//import { gameArray } from '../types/game'

// const currentFilePath = __dirname

// const JSONFilePath = currentFilePath.replace('/src/lib', '/json')

export const readJSONFile = async (fileName: string) => {
  //const JSONFileName = path.join(JSONFilePath, fileName)
  try {
    const data = await readFile(fileName, 'utf8')
    //return gameArray.parse(await JSON.parse(data))

    return data
  } catch (error) {
    console.error(`Error reading ${fileName}: ${error}`)
    throw new Error('Något gick fel vid läsning')
  }
}
