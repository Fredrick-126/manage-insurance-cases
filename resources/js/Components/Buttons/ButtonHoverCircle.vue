<script setup>
import useStyledControls from '@/Hooks/TailwindClasses/controls'

const { hoverButton, circleButton } = useStyledControls()
</script>

<template>
  <button
    :class="[hoverButton, circleButton]"
    type="button"
  >
    <slot />
  </button>
</template>
