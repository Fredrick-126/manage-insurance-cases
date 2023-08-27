<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  BottomToTop,
  ButtonHoverWide,
  ButtonNext,
  CustomButtonLoading,
  DefaultMessage,
  FadeInOut,
  GoBack,
  JaseSelect,
  SmallHeader,
  SmallLabel,
  useStyledContainers,
  useStyledControls,
} from './inports'
import { addInsuranceCase, updateInsuranceCase } from '@/Actions'

const { cars, form, platform, showEditPage } = defineProps([
  'cars',
  'form',
  'platform',
  'showEditPage',
])

const emits = defineEmits(['close', 'update'])

const { buttonWrapper } = useStyledContainers()

// form controls classes
const {
  formGroup,
  formItem,
  formControl,
  formControlBorder,
} = useStyledControls()

// Disable continue if validation is false
const disableContinue = computed(
  () =>
    !form.data.case
    || !form.data.car_make
    || !form.data.car_model
    || !form.data.mileage
    || !form.data.boughtAt,
)

const savingModel = ref(false)
const formStep = ref(0)
const modelOptions = ref()

function removeErrors() {
  form.data.errorMessage = null
  savingModel.value = false
}

function handleClose() {
  formStep.value = 0
  removeErrors()
  emits('close')
}

function handleCallback(data, complete) {
  savingModel.value = false

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

  if (complete)
    handleClose()
}

function handleError(message) {
  form.data.errorMessage = message || 'Something went wrong, please try again later!'
  savingModel.value = false
}

function handleSave(complete = false) {
  savingModel.value = true

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

function handleUpdateMake(value) {
  form.data.car_model = null
  modelOptions.value = value?.car_models || []
}

function handleBack() {
  formStep.value = 0
}

function handleNext() {
  formStep.value = 1

  handleSave(false)
}

onMounted(() => {
  if (cars && cars.length)
    modelOptions.value = cars[0].car_models || []
})
</script>

<template>
  <BottomToTop
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showEditPage"
      :class="[{ hidden: !showEditPage, absolute: showEditPage }]"
      class="car-model-form w-full min-h-container top-0 left-0 bg-body flex justify-center"
    >
      <div class="w-full max-w-[100vw] sm:max-w-[900px]">
        <GoBack
          v-if="formStep > 0"
          @back="handleBack"
        />

        <SmallHeader> Input Insurance Case</SmallHeader>

        <div
          v-if="formStep === 0"
          class="w-full p-2"
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
                <SmallLabel>Case:</SmallLabel>
                <input
                  v-model="form.data.case"
                  :class="[formControl, formControlBorder]"
                  class="w-full"
                  type="text"
                  placeholder="Case"
                  @focus="removeErrors"
                  @change="handleSave(false)"
                >
              </div>

              <div
                :class="[formItem]"
                class="sm:flex-form-item"
              >
                <SmallLabel>Make:</SmallLabel>
                <JaseSelect
                  v-model="form.data.car_make"
                  :show-no-results="false"
                  :show-no-options="false"
                  :options="cars"
                  :class="[formControl, formControlBorder]"
                  class="w-full"
                  name="name"
                  placeholder="Make"
                  label="name"
                  track-by="id"
                  @update:model-value="handleUpdateMake"
                  @open="removeErrors"
                />
              </div>

              <div
                :class="[formItem]"
                class="sm:flex-form-item"
              >
                <SmallLabel>Model:</SmallLabel>
                <JaseSelect
                  v-model="form.data.car_model"
                  :show-no-results="false"
                  :show-no-options="false"
                  :options="modelOptions"
                  :class="[formControl, formControlBorder]"
                  class="w-full"
                  name="model_name"
                  placeholder="Model"
                  label="model_name"
                  track-by="id"
                  @update:model-value="handleSave(false)"
                  @open="removeErrors"
                />
              </div>

              <div
                :class="[formItem]"
                class="sm:flex-form-item"
              >
                <SmallLabel>Mileage:</SmallLabel>
                <input
                  v-model="form.data.mileage"
                  :class="[formControl, formControlBorder]"
                  class="w-full"
                  type="number"
                  placeholder="Mileage"
                  @change="handleSave(false)"
                  @focus="removeErrors"
                >
              </div>

              <div
                :class="[formItem]"
                class="sm:flex-form-item"
              >
                <SmallLabel>Buying Date:</SmallLabel>
                <input
                  v-model="form.data.boughtAt"
                  :class="[formControl, formControlBorder]"
                  class="w-full"
                  type="date"
                  placeholder="Buying Date"
                  @change="handleSave(false)"
                  @focus="removeErrors"
                >
              </div>
            </div>
          </div>
        </div>

        <div
          :class="[buttonWrapper]"
          class="mt-6"
        >
          <ButtonHoverWide
            v-if="form.data.id && formStep > 0"
            class="mr-2"
            @click="handleClose"
          >
            Cancel
          </ButtonHoverWide>
          <ButtonNext
            v-if="formStep > 0"
            :disabled="!!savingModel"
            class="ml-2 relative"
            @click="handleSave(true)"
          >
            <CustomButtonLoading
              v-if="!!savingModel"
              class="text-primary"
            />
            <template v-else>
              Save
            </template>
          </ButtonNext>
          <ButtonNext
            v-else
            :disabled="!!savingModel || disableContinue"
            @click="handleNext"
          >
            <CustomButtonLoading
              v-if="!!savingModel"
              class="text-primary"
            />
            <template v-else>
              Continue &gt;
            </template>
          </ButtonNext>
        </div>
      </div>
    </div>
  </BottomToTop>
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
