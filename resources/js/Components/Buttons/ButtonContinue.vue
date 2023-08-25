<script setup>
import useStyledControls from '@/Hooks/TailwindClasses/controls'

const { button, buttonContinue } = useStyledControls()
</script>

<template>
  <button
    :class="[button, buttonContinue]"
    type="button"
  >
    <slot />
  </button>
</template>
