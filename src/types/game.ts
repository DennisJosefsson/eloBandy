import { z } from 'zod'

const gameObject = z.object({
  team: z.coerce.string(),
  opponent: z.coerce.string(),
  points: z.number(),
  date: z.string(),
})

export const gameArray = z.array(gameObject)

export type GameObject = z.infer<typeof gameObject>
