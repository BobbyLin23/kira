<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import Avatar from '../ui/avatar/Avatar.vue'

const props = defineProps<{
  image?: string
  name: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div v-if="image" :class="cn('size-10 relative rounded-md overflow-hidden', props.class)">
    <NuxtImg :src="image" :alt="name" class="object-cover" />
  </div>
  <Avatar v-else :class="cn('size-10', props.class)">
    <AvatarFallback class="bg-blue-600 text-lg font-semibold text-white uppercase">
      {{ name[0] }}
    </AvatarFallback>
  </Avatar>
</template>
