import { z } from 'zod'

const gameObject = z.object({
  team: z.coerce.string(),
  opponent: z.coerce.string(),
  points: z.number(),
  date: z.string(),
})

const scheduleObject = gameObject.omit({ points: true })

export const tableRecord = z.record(z.string(), z.number())

export const gameArray = z.array(gameObject)
export const scheduleArray = z.array(scheduleObject)

export type GameObject = z.infer<typeof gameObject>
export type ScheduleArray = z.infer<typeof scheduleArray>
export type ScheduleObject = z.infer<typeof scheduleObject>
export type TableRecord = z.infer<typeof tableRecord>
