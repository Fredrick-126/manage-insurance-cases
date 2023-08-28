<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  ButtonNext,
  CustomButtonLoading,
  DefaultMessage,
  FadeInOut,
  JaseSelect,
  SmallHeader,
  SmallLabel,
  useStyledContainers,
  useStyledControls,
} from './imports'

const { cars, form, maxMileage, platform, savingInsurance } = defineProps([
  'cars',
  'form',
  'maxMileage',
  'platform',
  'savingInsurance',
])

const emits = defineEmits(['next', 'remove', 'save'])

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

const modelOptions = ref()

function removeErrors() {
  emits('remove')
}

function handleSave(complete = false) {
  emits('save', complete)
}

function handleUpdateMake(value) {
  form.data.car_model = null
  modelOptions.value = value?.car_models || []
}

function handleNext() {
  emits('next')
}

function handleChangeMileage() {
  if (form.data.mileage >= maxMileage)
    // eslint-disable-next-line no-alert
    alert('We can insure your car.')

  handleSave(false)
}

onMounted(() => {
  if (cars && cars.length)
    modelOptions.value = cars[0].car_models || []
})
</script>

<template>
  <div class="car-model-form w-full max-w-[100vw] sm:max-w-[900px]">
    <SmallHeader> Input Insurance Case</SmallHeader>

    <div class="w-full p-2">
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
            v-if="modelOptions"
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
              @change="handleChangeMileage"
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
      <ButtonNext
        :disabled="!!savingInsurance || disableContinue"
        @click="handleNext"
      >
        <CustomButtonLoading
          v-if="!!savingInsurance"
          class="text-primary"
        />
        <template v-else>
          Continue &gt;
        </template>
      </ButtonNext>
    </div>
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
