<script lang="ts" setup>

</script>

<template>
  <aside class="h-full w-full bg-neutral-100 p-4">
    <NuxtLink href="/">
      <NuxtImg src="logo.svg" alt="logo" :width="164" :height="48" />
    </NuxtLink>
    <DottedSeparator class="my-4" />
    <WorkspaceSwitcher />
    <DottedSeparator class="my-4" />
    <Navigation />
  </aside>
</template>
