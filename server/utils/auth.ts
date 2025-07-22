import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db'
import * as schemas from '../db/schema'
import { sendEmail } from './email'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schemas,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: `Click the link to verify your email: ${url}`,
      })
    },
  },
})
