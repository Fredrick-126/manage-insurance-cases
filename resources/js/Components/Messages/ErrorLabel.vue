<script setup>
import { CustomAlert } from '@/Components/Icons/'
</script>

<template>
  <div
    class="text-red-600 font-semibold text-xs px-1 py-1 rounded-sm mt-1 flex items-center gap-1"
  >
    <CustomAlert class="min-w-[1rem] min-h-[0.75rem]" />
    <slot />
  </div>
</template>
