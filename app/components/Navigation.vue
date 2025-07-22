<script lang="ts" setup>
const routes = [
  {
    label: 'Home',
    href: '/',
    icon: 'ri:home-line',
    activeIcon: 'ri:home-fill',
  },
  {
    label: 'My Tasks',
    href: '/tasks',
    icon: 'ri:task-line',
    activeIcon: 'ri:task-fill',
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'ri:settings-line',
    activeIcon: 'ri:settings-fill',
  },
  {
    label: 'Members',
    href: '/members',
    icon: 'ri:user-line',
    activeIcon: 'ri:user-fill',
  },
]

const isActive = ref(false)
</script>

<template>
  <ul class="flex flex-col">
    <li v-for="route in routes" :key="route.label">
      <NuxtLink :to="route.href" class="flex items-center">
        <div
          :class="cn('flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500',
                     isActive && 'bg-white shadow-sm hover:opacity-100 text-primary',
          )"
        >
          <Icon v-if="!isActive" :name="route.icon" class="mr-2 size-5 text-neutral-500" />
          <Icon v-else :name="route.activeIcon" class="mr-2 size-5 text-neutral-500" />
          {{ route.label }}
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
