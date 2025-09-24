import { z } from 'zod'

export const eloRecord = z.record(z.string(), z.number())
export type EloObject = z.infer<typeof eloRecord>
