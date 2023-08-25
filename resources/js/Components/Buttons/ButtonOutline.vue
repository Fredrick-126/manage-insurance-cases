<script setup>
import useStyledControls from '@/Hooks/TailwindClasses/controls'

const { outlineButton, buttonContinue } = useStyledControls()
</script>

<template>
  <button
    :class="[outlineButton, buttonContinue]"
    type="button"
  >
    <slot />
  </button>
</template>
