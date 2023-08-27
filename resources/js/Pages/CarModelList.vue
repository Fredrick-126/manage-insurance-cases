<script setup>
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import useStyledContainers from '@/Hooks/TailwindClasses/containers'
import useTheme from '@/Hooks/theme'
import { CustomPlus } from '@/Components/Icons/'
import { ButtonDelete, ButtonEdit, ButtonNext } from '@/Components/Buttons'
import { ConfirmPopup, EditModel } from '@/Components/Pages'
import { deleteCarModel } from '@/Actions'

const { data, makes, errors } = defineProps([
  'data',
  'makes',
  'errors',
])

const {
  pageContainer,
  pageContent,
  pageContentCard,
  pageHeader,
  tableCol,
  tableContainer,
} = useStyledContainers()

const { platformName } = useTheme()

const showAddModal = ref(false)
const carModelList = ref(data)
const showConfirmModal = ref(false)
const deleteId = ref()

const form = ref({
  data: {
    id: null,
    errorMessage: null,
    nameError: null,
    makeIdError: null,
    modelName: null,
    carMake: null,
  },
})

function toggleAddModal(flag = false) {
  showAddModal.value = flag
}

function setCarModelList(list) {
  carModelList.value = list
}

function setFormData(item) {
  form.value.data = {
    id: item.id,
    carMake: item.car_make,
    modelName: item.model_name,
    errorMessage: null,
    nameError: null,
    makeIdError: null,
  }

  toggleAddModal(true)
}

function handleDelete(id) {
  deleteId.value = id
  showConfirmModal.value = true
}

function confirmDelete(confirm) {
  if (confirm) {
    deleteCarModel(deleteId.value).then(re => {
      showConfirmModal.value = false

      if (re.status === 'success')
        carModelList.value = re.data
    }).catch(e => {
      showConfirmModal.value = false
    })

    // confirm logic
    showConfirmModal.value = false
  }
  else {
    showConfirmModal.value = false
  }
}
</script>

<template>
  <Head title="Models">
    <title>Models</title>
  </Head>

  <AuthenticatedLayout>
    <template #header>
      <h2 :class="[pageHeader]">
        Models
      </h2>
    </template>

    <div :class="[pageContainer]">
      <div :class="[pageContent]">
        <div :class="[pageContentCard]">
          <div class="w-full flex justify-end items-center mb-3">
            <ButtonNext
              class="gap-x-1"
              @click="setFormData({
                id: null,
                model_name: null,
                car_make: null,
              })"
            >
              <CustomPlus />
              Add
            </ButtonNext>
          </div>
          <table :class="[tableContainer]">
            <thead>
              <tr class="bg-gray-300">
                <th :class="[tableCol]">
                  No
                </th>
                <th :class="[tableCol]">
                  Make
                </th>
                <th :class="[tableCol]">
                  Model
                </th>
                <th :class="[tableCol]" />
              </tr>
            </thead>
            <tbody v-if="!!carModelList && carModelList.length">
              <template
                v-for="(carModel, m) in carModelList"
                :key="m"
              >
                <tr class="bg-white">
                  <td :class="[tableCol]">
                    {{ m + 1 }}
                  </td>
                  <td :class="[tableCol]">
                    {{ carModel.car_make.name }}
                  </td>
                  <td :class="[tableCol]">
                    {{ carModel.model_name }}
                  </td>
                  <td :class="[tableCol]">
                    <div class="flex items-center gap-x-2">
                      <ButtonEdit @click="setFormData(carModel)">
                        Edit
                      </ButtonEdit>
                      <ButtonDelete @click="handleDelete(carModel.id)">
                        Delete
                      </ButtonDelete>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
            <tbody v-else>
              <tr class="bg-white">
                <td
                  :class="[tableCol]"
                  class="text-center"
                  colspan="4"
                >
                  No data exists
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <EditModel
      v-model:show-add-modal="showAddModal"
      v-model:form="form"
      :platform="platformName"
      :makes-list="makes"
      @close="toggleAddModal"
      @update="setCarModelList"
    />
    <ConfirmPopup
      v-model:show-confirm-popup="showConfirmModal"
      :platform="platformName"
      message="This action will result in the removal of all associated Insurance Cases data. Are you certain you want to proceed with this deletion?"
      @confirm="confirmDelete"
    />
  </AuthenticatedLayout>
</template>
