import { readJSONFile } from './lib/readFile'

const FILENAME = 'men_0708.json'

async function main() {
  await readJSONFile(FILENAME)
}

main()
