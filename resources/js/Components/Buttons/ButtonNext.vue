<script setup>
import useStyledControls from '@/Hooks/TailwindClasses/controls'

const { button, buttonNext } = useStyledControls()
</script>

<template>
  <button
    :class="[button, buttonNext]"
    type="button"
  >
    <slot />
  </button>
</template>
