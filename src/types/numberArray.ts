import { z } from 'zod'

export const numberArray = z.array(z.number())

export const resultArrayRecord = z.record(z.string(), z.array(z.number()))
export type ResultArrayRecord = z.infer<typeof resultArrayRecord>
