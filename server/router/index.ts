import { protectedProcedure, publicProcedure } from '../utils/orpc'
import { createWorkspace, getWorkspaces } from './workspace'

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    }
  }),
  workspace: {
    create: createWorkspace,
    get: getWorkspaces,
  },
}

export type AppRouter = typeof appRouter
