<script setup>
const { width, height, maxWidth } = defineProps([
  'width',
  'height',
  'maxWidth',
])
</script>

<template>
  <div
    class="z-50 max-h-screen bg-white max-w-[100%] rounded-[5px] overflow-x-auto overflow-y-auto"
    :style="[
      `width: ${width};`,
      `height: ${height};`,
      maxWidth ? `max-width: ${maxWidth};` : '',
      'max-height: 80vh',
    ]"
  >
    <div class="min-h-[60px] p-4 flex items-center w-full shadow-control">
      <slot name="header" />
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div
      class="min-h-[60px] px-2 pt-4 pb-8 flex items-center justify-center w-full bg-body gap-4"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
