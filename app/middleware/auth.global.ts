const publicRoutes = ['/sign-in', '/sign-up']

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)

  if (!session.value) {
    if (!publicRoutes.includes(to.path)) {
      return navigateTo('/sign-in')
    }
  }
})
