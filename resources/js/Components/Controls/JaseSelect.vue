<script setup>
import VueMultiselect from 'vue-multiselect'

const { options } = defineProps(['options'])
</script>

<template>
  <VueMultiselect
    :options="options"
    :close-on-select="true"
    :clear-on-select="false"
    :show-labels="false"
    class="w-full"
    placeholder="Select one"
    select-label=""
    deselect-label=""
  />
</template>

<style src="../../../css/jase-select.css"></style>
