<script setup>
import { computed, ref } from 'vue'
import {
  ButtonHoverWide,
  ButtonNext,
  CustomButtonLoading,
  DefaultMessage,
  ErrorLabel,
  FadeInOut,
  ModalTop,
  SmallHeader,
  TopToBottom,
  useStyledContainers,
  useStyledControls,
} from './inports'
import { addCarMake, updateCarMake } from '@/Actions'

const { form, platform, showAddModal } = defineProps([
  'form',
  'platform',
  'showAddModal',
])

const emits = defineEmits(['close', 'update'])

const { modalContainer, modalBackDrop } = useStyledContainers()

// form controls classes
const {
  formGroup,
  formItem,
  formControl,
  formControlBorder,
  formControlError,
} = useStyledControls()

const savingMake = ref(false)

function removeErrors() {
  form.data.errorMessage = null
  form.data.nameError = null
  savingMake.value = false
}

function handleClose() {
  removeErrors()
  emits('close')
}

function handleCallback(list) {
  savingMake.value = false
  emits('update', list)
  handleClose()
}

function handleError(message) {
  form.data.errorMessage = message || 'Something went wrong, please try again later!'
  savingMake.value = false
}

function handleSave() {
  if (!form.data.makeName || form.data.makeName === '') {
    form.data.nameError = 'Make name is required'

    return
  }

  savingMake.value = true

  if (form.data.id) {
    updateCarMake(form.data).then(re => {
      if (re.status === 'success')
        handleCallback(re.data)
      else
        handleError(null)
    }).catch(e => {
      handleError(e.response.data.message)
    })
  }
  else {
    addCarMake(form.data).then(re => {
      if (re.status === 'success')
        handleCallback(re.data)

      else
        handleError(null)
    }).catch(e => {
      handleError(e.response.data.message)
    })
  }
}

const canSave = computed(() => !!form.data.makeName)
</script>

<template>
  <div
    :class="[modalContainer, { hidden: !showAddModal, flex: showAddModal }]"
  >
    <div :class="[modalBackDrop]" />

    <TopToBottom
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ModalTop
        v-if="showAddModal"
        :width="platform === 'desktop' ? '560px' : '98%'"
        height="auto"
      >
        <template #header>
          <SmallHeader> {{ form.data.id ? 'Update' : 'Add' }} a Make</SmallHeader>
        </template>

        <div
          class="w-full"
        >
          <div class="px-4 py-2 bg-white">
            <!--    Show error if exist one    -->
            <FadeInOut>
              <DefaultMessage
                v-if="!!form.data.errorMessage"
                class="mt-3"
              >
                {{ !!form.data.errorMessage ? form.data.errorMessage : "" }}
              </DefaultMessage>
            </FadeInOut>

            <div :class="[formGroup]">
              <div :class="[formItem]">
                <input
                  v-model="form.data.makeName"
                  :class="[
                    formControl,
                    formControlBorder,
                    !!form.data.nameError ? formControlError : '',
                  ]"
                  class="w-full max-w-screen-xxs"
                  type="text"
                  placeholder="Make"
                  @focus="removeErrors"
                >
                <FadeInOut>
                  <ErrorLabel v-if="!!form.data.nameError">
                    {{
                      !!form.data.nameError ? form.data.nameError : ""
                    }}
                  </ErrorLabel>
                </FadeInOut>
              </div>
            </div>
          </div>
        </div>

        <template #actions>
          <ButtonHoverWide @click="handleClose">
            Cancel
          </ButtonHoverWide>
          <ButtonNext
            :disabled="!!savingMake || !canSave"
            class="ml-2 relative"
            @click="handleSave"
          >
            <CustomButtonLoading
              v-if="!!savingMake"
              class="text-primary"
            />
            <template v-else>
              Save
            </template>
          </ButtonNext>
        </template>
      </ModalTop>
    </TopToBottom>
  </div>
</template>
