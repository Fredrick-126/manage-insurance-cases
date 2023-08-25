<script setup>
import useStyledControls from '@/Hooks/TailwindClasses/controls'

const { hoverButton, wideButton } = useStyledControls()
</script>

<template>
  <button
    :class="[hoverButton, wideButton]"
    type="button"
  >
    <slot />
  </button>
</template>
