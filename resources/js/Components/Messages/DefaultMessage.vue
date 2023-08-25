<script setup>
import { CustomAlert } from '@/Components/Icons/'

const { error } = defineProps({
  error: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div
    class="text-white px-1 py-1 rounded-[5px] mt-1 text-sm shadow-control flex items-center font-semibold gap-1"
    :class="{ 'bg-primary': !error, 'bg-red-600': error }"
  >
    <CustomAlert class="min-w-[1rem] min-h-[0.75rem]" />
    <slot />
  </div>
</template>
