<script lang="ts" setup>
import { LoaderIcon, LogOutIcon } from 'lucide-vue-next'

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
  <template v-if="session.isPending">
    <div class="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
      <LoaderIcon class="size-4 animate-spin text-muted-foreground" />
    </div>
  </template>
  <template v-if="session.data?.user">
    <DropdownMenu :modal="false">
      <DropdownMenuTrigger class="outline-none relative">
        <Avatar class="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback class="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {{ session.data.user.name.charAt(0).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" class="w-60" :side-offset="10">
        <div class="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar class="size-[52px] border border-neutral-300">
            <AvatarFallback class="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {{ session.data.user.name.charAt(0).toUpperCase() }}
            </AvatarFallback>
          </Avatar>
          <div class="flex flex-col items-center justify-center gap-1">
            <p class="text-sm font-medium text-neutral-800">
              {{ session.data.user.name }}
            </p>
            <p class="text-xs text-neutral-500">
              {{ session.data.user.email }}
            </p>
          </div>
        </div>
        <DottedSeparator class="mb-1" />
        <DropdownMenuItem class="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer" @click="logout">
          <LogOutIcon class="size-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </template>
</template>
