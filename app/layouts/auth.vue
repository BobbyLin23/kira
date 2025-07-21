<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div class="bg-neutral-100 min-h-screen">
    <div class="mx-auto max-w-screen-2xl p-4">
      <nav class="flex justify-between items-center">
        <NuxtImg src="/logo.svg" height="56" width="152" alt="Logo" />
        <Button variant="secondary" as-child>
          <NuxtLink :to="route.path === '/sign-up' ? '/sign-in' : '/sign-up'">
            {{ route.path === '/sign-up' ? 'Sign In' : 'Sign Up' }}
          </NuxtLink>
        </Button>
      </nav>
      <div class="flex flex-col items-center justify-center pt-4 md:pt-14">
        <slot />
      </div>
    </div>
  </div>
</template>
