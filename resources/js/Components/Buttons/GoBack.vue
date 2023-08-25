<script setup>
import { CustomArrowBack } from '@/Components/Icons/'

const emits = defineEmits(['back'])

function handleBack() {
  emits('back')
}
</script>

<template>
  <div class="absolute top-[15px] left-[20px] sm:top-[24px] sm:left-[24px]">
    <button
      class="p-1 m-0 border-0 bg-transparent"
      type="button"
      @click="handleBack"
    >
      <CustomArrowBack />
    </button>
  </div>
</template>
