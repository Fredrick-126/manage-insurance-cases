<script setup>
import useStyledControls from '@/Hooks/TailwindClasses/controls'

const { button } = useStyledControls()
</script>

<template>
  <button
    :class="[button]"
    class="rounded-[5px]"
    type="button"
  >
    <slot />
  </button>
</template>
