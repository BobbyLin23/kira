import { z } from 'zod'
import { db } from '../db'
import { workspace } from '../db/schema'

const WorkspaceSchema = z.object({
  name: z.string(),
})

export const createWorkspace = protectedProcedure.input(
  WorkspaceSchema,
).handler(async ({ input, context }) => {
  const workspaceData = {
    name: input.name,
    userId: context.session.user.id,
  }

  const newWorkspace = await db.insert(workspace).values({
    ...workspaceData,
  }).returning()

  return newWorkspace[0]
})
