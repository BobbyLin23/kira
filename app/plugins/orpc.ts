import type { RouterClient } from '@orpc/server'
import type { appRouter } from '~~/server/router'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

export default defineNuxtPlugin(() => {
  const event = useRequestEvent()

  const link = new RPCLink({
    url: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/rpc`,
    headers: () => Object.fromEntries(event?.headers ?? []),
  })

  const orpc: RouterClient<typeof appRouter> = createORPCClient(link)

  const client = createTanstackQueryUtils(orpc)

  return {
    provide: {
      client,
    },
  }
})
