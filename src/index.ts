import { calcResultDistribution } from './lib/calcResultDistribution'
// import { getNewEloObject } from './lib/getNewEloObject'
// import { writeELOFile } from './lib/writeFile'

// let women = false

async function main() {
  // for (let year = 2007; year < 2025; year++) {
  //   const eloObject = await getNewEloObject(year, women)
  //   await writeELOFile(eloObject, year, women)
  //   if (year > 2014) {
  //     women = true
  //     const eloObject = await getNewEloObject(year, women)
  //     await writeELOFile(eloObject, year, women)
  //     women = false
  //   }
  // }

  // console.log('DONE!')
  const data = await calcResultDistribution(2025, false)
  console.log(data)
}

main()
