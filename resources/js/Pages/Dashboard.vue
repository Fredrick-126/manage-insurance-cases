<script setup>
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import useStyledContainers from '@/Hooks/TailwindClasses/containers'
import useTheme from '@/Hooks/theme'
import { CustomPlus } from '@/Components/Icons/'
import { ButtonDelete, ButtonEdit, ButtonNext } from '@/Components/Buttons'
import { ConfirmPopup, EditInsuranceCase } from '@/Components/Pages'
import { deleteInsuranceCase } from '@/Actions'

const { cars, data, errors } = defineProps([
  'cars',
  'data',
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

const showEditPage = ref(false)
const insuranceCaseList = ref(data?.data?.list || [])
const showConfirmModal = ref(false)
const deleteId = ref()

const form = ref({
  data: {
    id: null,
    case: '',
    car_make: null,
    car_model: null,
    mileage: null,
    boughtAt: null,
    color: null,
    drivetrain: null,
    pictureName: null,
    pictureImage: null,
    pictureUrl: null,
    status: 'draft',
    errorMessage: null,
  },
})

function showEditModal(flag = false) {
  showEditPage.value = flag
}

function updateCaseList({ list, flag }) {
  if (flag === 'update') {
    const selectedIndex = insuranceCaseList.value.findIndex(el => el.id === list.id)

    insuranceCaseList.value[selectedIndex] = list
  }
  else if (flag === 'create') {
    insuranceCaseList.value.push(list)
  }
  else {
    const selectedIndex = insuranceCaseList.value.findIndex(el => el.id === deleteId.value)

    insuranceCaseList.value.splice(selectedIndex, 1)
  }
}

function setFormData(item) {
  form.value.data = {
    id: item.id,
    case: item.case,
    car_make: item.car_make,
    car_model: item.car_model,
    mileage: item.mileage,
    boughtAt: item.bought_at,
    color: item.color,
    drivetrain: item.drivetrain,
    pictureName: item.picture_name,
    pictureImage: null,
    pictureUrl: item.picture_url,
    status: item.status,
    errorMessage: null,
  }

  showEditModal(true)
}

function handleDelete(id) {
  deleteId.value = id
  showConfirmModal.value = true
}

function confirmDelete(confirm) {
  if (confirm) {
    deleteInsuranceCase(deleteId.value).then(re => {
      showConfirmModal.value = false

      if (re.status === 'success')
        updateCaseList({ list: null, flag: 'delete' })
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
  <Head title="Insurance Cases">
    <title>Insurance Cases</title>
  </Head>

  <AuthenticatedLayout>
    <template #header>
      <h2 :class="[pageHeader]">
        Insurance Cases
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
                name: null,
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
                  Picture
                </th>
                <th :class="[tableCol]">
                  Case
                </th>
                <th :class="[tableCol]">
                  Makes
                </th>
                <th :class="[tableCol]">
                  Model
                </th>
                <th :class="[tableCol]">
                  Mileage
                </th>
                <th :class="[tableCol]">
                  Buying Date
                </th>
                <th :class="[tableCol]">
                  Status
                </th>
                <th :class="[tableCol]" />
              </tr>
            </thead>
            <tbody v-if="!!insuranceCaseList && insuranceCaseList.length">
              <template
                v-for="(insurance, m) in insuranceCaseList"
                :key="m"
              >
                <tr class="bg-white">
                  <td :class="[tableCol]">
                    {{ m + 1 }}
                  </td>
                  <td :class="[tableCol]">
                    <img
                      v-if="insurance.picture_url"
                      :src="insurance.picture_url"
                      alt=""
                      class="w-full max-w-[100px] h-auto rounded"
                    >
                  </td>
                  <td :class="[tableCol]">
                    {{ insurance.case }}
                  </td>
                  <td :class="[tableCol]">
                    {{ insurance.car_make?.name || '' }}
                  </td>
                  <td :class="[tableCol]">
                    {{ insurance.car_model?.model_name || '' }}
                  </td>
                  <td :class="[tableCol]">
                    {{ insurance.mileage }}
                  </td>
                  <td :class="[tableCol]">
                    {{ insurance.bought_at }}
                  </td>
                  <td :class="[tableCol]">
                    {{ insurance.status }}
                  </td>
                  <td :class="[tableCol]">
                    <div class="flex items-center gap-x-2">
                      <ButtonEdit @click="setFormData(insurance)">
                        Edit
                      </ButtonEdit>
                      <ButtonDelete @click="handleDelete(insurance.id)">
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
                  colspan="9"
                >
                  No data exists
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <EditInsuranceCase
          v-model:show-edit-page="showEditPage"
          v-model:form="form"
          :cars="cars"
          :platform="platformName"
          @close="showEditModal"
          @update="updateCaseList"
        />
      </div>
    </div>
    <ConfirmPopup
      v-model:show-confirm-popup="showConfirmModal"
      :platform="platformName"
      message="This action will remove data permanently from our database. Are you certain you want to proceed with this deletion?"
      @confirm="confirmDelete"
    />
  </AuthenticatedLayout>
</template>
