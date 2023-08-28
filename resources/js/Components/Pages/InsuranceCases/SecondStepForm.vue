<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  ButtonDelete,
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
} from './imports'

const { cars, enableDrivetrain, form, maxMileage, platform, savingInsurance } = defineProps([
  'cars',
  'enableDrivetrain',
  'form',
  'maxMileage',
  'platform',
  'savingInsurance',
])

const emits = defineEmits(['close', 'next', 'prev', 'remove', 'save'])

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
    !form.data.color
    || !form.data.case
    || !form.data.car_make
    || !form.data.car_model
    || !form.data.mileage
    || (form.data.mileage && form.data.mileage >= maxMileage)
    || !form.data.boughtAt
    || (!!form.data.car_model && enableDrivetrain.includes(form.data.car_model.model_name) && !form.data.drivetrain)
    || !(form.data.pictureName || form.data.pictureImage),
)

const preview = ref()
const fileInput = ref()

function removeErrors() {
  emits('remove')
}

function handleClose() {
  emits('close')
}

function handleSave(complete = false) {
  emits('save', complete)
}

function handleBack() {
  emits('prev')
}

function changePreview(value) {
  preview.value = value
}

function setCarPicture(pictureImage) {
  form.data.pictureImage = pictureImage
}

function clearCarPicture() {
  changePreview(null)
  setCarPicture(null)
  form.data.pictureName = null
}

function fileUploadChange(event) {
  const input = event.target
  if (input.files) {
    const reader = new FileReader()

    reader.onload = e => {
      changePreview(e.target.result)
      setCarPicture(e.target.result)

      handleSave(false)
    }

    form.data.pictureName = input.files[0].name
    reader.readAsDataURL(input.files[0])
  }
}

function openFilePicker() {
  fileInput.value.value = null
  clearCarPicture()
  fileInput.value.click()
}

onMounted(() => {
  if (form.data.pictureUrl)
    preview.value = form.data.pictureUrl
})
</script>

<template>
  <div class="car-model-form w-full max-w-[100vw] sm:max-w-[900px]">
    <SmallHeader class="mb-4">
      Input Insurance Case
    </SmallHeader>

    <GoBack
      @back="handleBack"
    />

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
          <div
            :class="[formItem]"
            class="sm:flex-form-item"
          >
            <SmallLabel>Color:</SmallLabel>
            <JaseSelect
              v-model="form.data.color"
              :show-no-results="false"
              :show-no-options="false"
              :options="['White', 'Silver', 'Black', 'Other']"
              :class="[formControl, formControlBorder]"
              class="w-full"
              placeholder="Color"
              @update:model-value="handleSave(false)"
              @open="removeErrors"
            />
          </div>
          <div
            v-if="!!form.data.car_model && enableDrivetrain.includes(form.data.car_model.model_name)"
            :class="[formItem]"
            class="sm:flex-form-item"
          >
            <SmallLabel>Drivetrain:</SmallLabel>
            <JaseSelect
              v-model="form.data.drivetrain"
              :show-no-results="false"
              :show-no-options="false"
              :options="['2x4', '4x4']"
              :class="[formControl, formControlBorder]"
              class="w-full"
              placeholder="Drivetrain"
              @update:model-value="handleSave(false)"
              @open="removeErrors"
            />
          </div>
          <div
            :class="[formItem]"
          >
            <ButtonNext
              class="upload-photo gap-1"
              @click="openFilePicker"
            >
              <span>Upload Image</span>
              <input
                ref="fileInput"
                type="file"
                class="form-control-file hidden"
                accept="image/*"
                @change="fileUploadChange"
              >
            </ButtonNext>

            <div
              v-if="preview"
              class="mt-3"
            >
              <div class="p-[8px] flex items-center justify-center max-w-screen-xxs">
                <img
                  :src="preview"
                  class="inline-block w-full h-auto rounded"
                  alt=""
                >
              </div>
              <div class="h-[40px] flex mt-3 items-center gap-x-2">
                <span id="chosen-file-name">{{ form.data.pictureName }}</span>
                <ButtonDelete
                  @click="clearCarPicture"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      :class="[buttonWrapper]"
      class="mt-6"
    >
      <ButtonHoverWide
        class="mr-2"
        @click="handleClose"
      >
        Close
      </ButtonHoverWide>
      <ButtonNext
        :disabled="!!savingInsurance || disableContinue"
        class="ml-2 relative"
        @click="handleSave(true)"
      >
        <CustomButtonLoading
          v-if="!!savingInsurance"
          class="text-primary"
        />
        <template v-else>
          Get Quote
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

.upload-photo:before {
  content: "";
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.7 0H.9C.403 0 0 .406 0 .91v18.18c0 .504.403.91.9.91h19.8c.497 0 .9-.406.9-.91V.91a.904.904 0 00-.9-.91zm-.9 1.818v10.91l-4.5-4.546-5.4 6.364-4.5-3.637-3.6 3.636V1.819h18z' fill='%23fff'/%3E%3Ccircle cx='9.199' cy='6.801' r='2' fill='%23fff'/%3E%3C/svg%3E");
  width: 22px;
  height: 20px;
  margin-right: 10px;
}
</style>
