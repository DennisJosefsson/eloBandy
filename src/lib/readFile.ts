import path from 'node:path'
// import { readFile } from "node:fs/promises";

const currentFilePath = __dirname

const JSONFilePath = currentFilePath.replace('/src/lib', '/json')

export const readJSONFile = async (fileName: string) => {
  const JSONFileName = path.join(JSONFilePath, fileName)
  console.log(JSONFileName)
}
