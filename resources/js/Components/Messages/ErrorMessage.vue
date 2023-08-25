<script setup>
import { MiddleLabel } from '@/Components/content'
import { CustomAlert } from '@/Components/Icons/'
</script>

<template>
  <MiddleLabel>
    <div
      class="px-2 py-1 text-white bg-red-600 rounded-[5px] text-sm shadow-control flex items-center gap-1"
    >
      <CustomAlert class="min-w-[1rem] min-h-[0.75rem]" />
      <slot />
    </div>
  </MiddleLabel>
</template>
