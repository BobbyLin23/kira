<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  color?: string
  height?: string
  dotSize?: string
  gapSize?: string
  direction?: 'horizontal' | 'vertical'
}>(), {
  color: '#d4d4d8',
  height: '2px',
  dotSize: '2px',
  gapSize: '6px',
  direction: 'horizontal',
})

const isHorizontal = computed(() => props.direction === 'horizontal')
</script>

<template>
  <div :class="cn(isHorizontal ? 'w-full flex items-center' : 'h-full flex flex-col items-center', props.class)">
    <div
      :class="isHorizontal ? 'grow' : 'grow-0'"
      :style="{
        width: isHorizontal ? '100%' : props.height,
        height: isHorizontal ? props.height : '100%',
        backgroundImage: `radial-gradient(circle, ${props.color} 25%, transparent 25%)`,
        backgroundSize: isHorizontal ? `${parseInt(props.dotSize) + parseInt(props.gapSize)}px ${props.height}` : `${props.height} ${parseInt(props.dotSize) + parseInt(props.gapSize)}px`,
        backgroundRepeat: isHorizontal ? 'repeat-x' : 'repeat-y',
        backgroundPosition: 'center',
      }"
    />
  </div>
</template>
