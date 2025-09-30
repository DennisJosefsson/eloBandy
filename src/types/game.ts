import { z } from 'zod'

const gameObject = z.object({
  team: z.coerce.string(),
  opponent: z.coerce.string(),
  points: z.number(),
  date: z.string(),
})

const scheduleObject = gameObject.omit({ points: true })

export const gameArray = z.array(gameObject)
export type GameObject = z.infer<typeof gameObject>

export const scheduleArray = z.array(scheduleObject)
export type ScheduleObject = z.infer<typeof scheduleObject>
