<script setup>
import {
  ButtonHoverWide,
  ButtonNext,
  ModalTop,
  SmallHeader,
  TopToBottom,
  useStyledContainers,
} from './imports'

const { platform, message, showConfirmPopup } = defineProps([
  'platform',
  'message',
  'showConfirmPopup',
])

const emits = defineEmits(['confirm'])

const { modalContainer, modalBackDrop } = useStyledContainers()

// toggle confirm medication popup
function toggleConfirm(flag) {
  emits('confirm', flag)
}
</script>

<template>
  <div
    :class="[
      modalContainer,
      { hidden: !showConfirmPopup, flex: showConfirmPopup },
    ]"
  >
    <div
      :class="[modalBackDrop]"
      @click="toggleConfirm(false)"
    />

    <TopToBottom
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ModalTop
        v-if="showConfirmPopup"
        :width="platform === 'desktop' ? '560px' : '98%'"
        height="auto"
      >
        <template #header>
          <SmallHeader> Are you sure?</SmallHeader>
        </template>

        <div
          v-if="!!message"
          class="w-full p-2 text-md text-center"
        >
          {{ message }}
        </div>

        <template #actions>
          <ButtonHoverWide @click="toggleConfirm(false)">
            No
          </ButtonHoverWide>
          <ButtonNext
            class="ml-2 relative"
            @click="toggleConfirm(true)"
          >
            Yes
          </ButtonNext>
        </template>
      </ModalTop>
    </TopToBottom>
  </div>
</template>
