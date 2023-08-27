<script setup>
import { computed, ref } from 'vue'
import {
  ButtonHoverWide,
  ButtonNext,
  CustomButtonLoading,
  DefaultMessage,
  ErrorLabel,
  FadeInOut,
  JaseSelect,
  ModalTop,
  SmallHeader,
  TopToBottom,
  useStyledContainers,
  useStyledControls,
} from './inports'
import { addCarModel, updateCarModel } from '@/Actions'

const { form, makesList, platform, showAddModal } = defineProps([
  'form',
  'makesList',
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

const savingModel = ref(false)

function removeErrors() {
  form.data.errorMessage = null
  form.data.nameError = null
  form.data.makeIdError = null
  savingModel.value = false
}

function handleClose() {
  removeErrors()
  emits('close')
}

function handleCallback(list) {
  savingModel.value = false
  emits('update', list)
  handleClose()
}

function handleError(message) {
  form.data.errorMessage = message || 'Something went wrong, please try again later!'
  savingModel.value = false
}

function handleSave() {
  if (!form.data.carMake) {
    form.data.makeIdError = 'Make is required'

    return
  }

  if (!form.data.modelName || form.data.modelName === '') {
    form.data.nameError = 'Model name is required'

    return
  }

  savingModel.value = true

  if (form.data.id) {
    updateCarModel(form.data).then(re => {
      if (re.status === 'success')
        handleCallback(re.data)
      else
        handleError(null)
    }).catch(e => {
      handleError(e.response.data.message)
    })
  }
  else {
    addCarModel(form.data).then(re => {
      if (re.status === 'success')
        handleCallback(re.data)
      else
        handleError(null)
    }).catch(e => {
      handleError(e.response.data.message)
    })
  }
}

const canSave = computed(() => !!form.data.modelName && !!form.data.carMake)
</script>

<template>
  <div
    :class="[modalContainer, { hidden: !showAddModal, flex: showAddModal }]"
    class="car-model-form"
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
          <SmallHeader> {{ form.data.id ? 'Update' : 'Add' }} a Model</SmallHeader>
        </template>

        <div
          class="w-full p-2 bg-card rounded-[5px]"
        >
          <div class="px-4 py-2">
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
                <JaseSelect
                  v-model="form.data.carMake"
                  :show-no-results="false"
                  :show-no-options="false"
                  :options="makesList"
                  :class="[
                    formControl,
                    formControlBorder,
                    !!form.data.makeIdError ? formControlError : '',
                  ]"
                  class="w-full max-w-screen-xxs"
                  name="name"
                  placeholder="Car Make"
                  label="name"
                  track-by="id"
                  @update:model-value="removeErrors"
                  @open="removeErrors"
                />
                <FadeInOut>
                  <ErrorLabel v-if="!!form.data.makeIdError">
                    {{
                      !!form.data.makeIdError ? form.data.makeIdError : ""
                    }}
                  </ErrorLabel>
                </FadeInOut>
              </div>
            </div>

            <div :class="[formGroup]">
              <div :class="[formItem]">
                <input
                  v-model="form.data.modelName"
                  :class="[
                    formControl,
                    formControlBorder,
                    !!form.data.nameError ? formControlError : '',
                  ]"
                  class="w-full max-w-screen-xxs"
                  type="text"
                  placeholder="Model Name"
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
            :disabled="!!savingModel || !canSave"
            class="ml-2 relative"
            @click="handleSave"
          >
            <CustomButtonLoading
              v-if="!!savingModel"
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

<style>
.car-model-form .multiselect .multiselect__tags {
  max-height: 47px;
}

.car-model-form .multiselect .multiselect__tags .multiselect__input,
.car-model-form .multiselect .multiselect__tags .multiselect__single {
  line-height: normal;
  min-height: auto;
  align-items: baseline;
  max-height: 47px;
  overflow: hidden;
  padding: 3px 0 3px 5px;
  vertical-align: middle;
}

.car-model-form .multiselect .multiselect__tags .multiselect__single {
  line-break: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
