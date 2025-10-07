import { eq } from 'drizzle-orm'
import { db } from '../db'
import { workspace } from '../db/schema'

export const createWorkspace = protectedProcedure.input(
  createWorkspaceSchema,
).handler(async ({ input, context }) => {
  const { name, image } = input

  const workspaceData = {
    name,
    userId: context.session.user.id,
    imageUrl: typeof image === 'string' ? image : '',
  }

  const [newWorkspace] = await db.insert(workspace).values({
    ...workspaceData,
  }).returning()

  return newWorkspace
})

export const getWorkspaces = protectedProcedure.handler(async ({ context }) => {
  const workspaces = await db.select().from(workspace).where(eq(workspace.userId, context.session.user.id))
  return workspaces
})
