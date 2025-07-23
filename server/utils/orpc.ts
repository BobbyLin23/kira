import type { Session, User } from 'better-auth'
import { ORPCError, os } from '@orpc/server'

export interface ORPCContext {
  session?: {
    session: Session
    user: User
  } | null
}

export const o = os.$context<ORPCContext>()

export const publicProcedure = o

const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.session) {
    throw new ORPCError('UNAUTHORIZED')
  }
  return next({
    context: {
      session: context.session,
    },
  })
})

export const protectedProcedure = publicProcedure.use(requireAuth)
