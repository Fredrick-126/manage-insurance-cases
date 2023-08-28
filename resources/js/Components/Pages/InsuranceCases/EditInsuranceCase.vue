<script setup>
import { computed, ref } from 'vue'
import { BottomToTop, DynamicEnter } from './imports'
import FirstStepForm from './FirstStepForm.vue'
import SecondStepForm from './SecondStepForm.vue'
import { addInsuranceCase, updateInsuranceCase } from '@/Actions'

const { cars, enableDrivetrain, form, maxMileage, platform, showEditPage } = defineProps([
  'cars',
  'enableDrivetrain',
  'form',
  'maxMileage',
  'platform',
  'showEditPage',
])

const emits = defineEmits(['close', 'update'])

const savingInsurance = ref(false)
const formStep = ref(0)

function removeErrors() {
  form.data.errorMessage = null
  savingInsurance.value = false
}

function handleClose() {
  formStep.value = 0
  removeErrors()
  emits('close')
}

function handleCallback(data, complete) {
  savingInsurance.value = false

  const flag = form.data.id ? 'update' : 'create'

  form.data = {
    id: data.id,
    case: data.case,
    car_make: data.car_make,
    car_model: data.car_model,
    mileage: data.mileage,
    boughtAt: data.bought_at,
    color: data.color,
    drivetrain: data.drivetrain,
    pictureName: data.picture_name,
    pictureImage: null,
    pictureUrl: data.picture_url,
    status: data.status,
    errorMessage: null,
  }

  emits('update', { list: data, flag })

  if (complete) {
    // eslint-disable-next-line no-alert
    alert('Thank you!')

    handleClose()
  }
}

function handleError(message) {
  form.data.errorMessage = message || 'Something went wrong, please try again later!'
  savingInsurance.value = false
}

function handleSave(complete = false) {
  if (!form.data.case || form.data.case === '')
    return

  savingInsurance.value = true

  if (complete)
    form.data.status = 'completed'

  if (form.data.id) {
    updateInsuranceCase(form.data).then(re => {
      if (re.status === 'success')
        handleCallback(re.data, complete)
      else
        handleError(null)
    }).catch(e => {
      handleError(e.response.data.message)
    })
  }
  else {
    addInsuranceCase(form.data).then(re => {
      if (re.status === 'success')
        handleCallback(re.data, complete)
      else
        handleError(null)
    }).catch(e => {
      handleError(e.response.data.message)
    })
  }
}

function handleBack() {
  formStep.value = 0
}

async function handleNext() {
  await handleSave(false)

  formStep.value = 1
}

// transition enter class name
const enterFromClass = computed(() =>
  formStep.value === 0
    ? 'translate-x-full opacity-0'
    : '-translate-x-full opacity-0',
)
</script>

<template>
  <BottomToTop
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showEditPage"
      :class="[{ hidden: !showEditPage, absolute: showEditPage }]"
      class="w-full min-h-container top-0 left-0 bg-body flex justify-center"
    >
      <DynamicEnter :enter-from-class="enterFromClass">
        <FirstStepForm
          v-if="formStep === 0"
          v-model:saving-insurance="savingInsurance"
          :form="form"
          :cars="cars"
          :max-mileage="maxMileage"
          :platform="platform"
          @next="handleNext"
          @remove="removeErrors"
          @save="handleSave"
        />

        <SecondStepForm
          v-if="formStep > 0"
          v-model:saving-insurance="savingInsurance"
          :form="form"
          :cars="cars"
          :enable-drivetrain="enableDrivetrain"
          :max-mileage="maxMileage"
          :platform="platform"
          @close="handleClose"
          @next="handleNext"
          @prev="handleBack"
          @remove="removeErrors"
          @save="handleSave"
        />
      </DynamicEnter>
    </div>
  </BottomToTop>
</template>
