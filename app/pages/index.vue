<script lang="ts" setup>
const session = authClient.useSession()

const router = useRouter()

async function logout() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push('/sign-in')
      },
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-2 items-center justify-center min-h-screen">
    {{ session.data?.session }}
    <Button @click="logout">
      Logout
    </Button>
  </div>
</template>
