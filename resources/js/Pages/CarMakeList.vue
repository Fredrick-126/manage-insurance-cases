<script setup>
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import useStyledContainers from '@/Hooks/TailwindClasses/containers'
import useTheme from '@/Hooks/theme'
import { CustomPlus } from '@/Components/Icons/'
import { ButtonDelete, ButtonEdit, ButtonNext } from '@/Components/Buttons'
import { ConfirmPopup, EditMake } from '@/Components/Pages'
import { deleteCarMake } from '@/Actions'

const { data, errors } = defineProps([
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

const showAddModal = ref(false)
const carMakeList = ref(data)
const showConfirmModal = ref(false)
const deleteId = ref()

const form = ref({
  data: {
    id: null,
    errorMessage: null,
    nameError: null,
    makeName: null,
  },
})

function toggleAddModal(flag = false) {
  showAddModal.value = flag
}

function setCarMakeList(list) {
  carMakeList.value = list
}

function setFormData(item) {
  form.value.data = {
    id: item.id,
    makeName: item.name,
    errorMessage: null,
    nameError: null,
  }

  toggleAddModal(true)
}

function handleDelete(id) {
  deleteId.value = id
  showConfirmModal.value = true
}

function confirmDelete(confirm) {
  if (confirm) {
    deleteCarMake(deleteId.value).then(re => {
      showConfirmModal.value = false

      if (re.status === 'success')
        carMakeList.value = re.data
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
  <Head title="Makes">
    <title>Makes</title>
  </Head>

  <AuthenticatedLayout>
    <template #header>
      <h2 :class="[pageHeader]">
        Makes
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
                  Name
                </th>
                <th :class="[tableCol]" />
              </tr>
            </thead>
            <tbody v-if="!!carMakeList && carMakeList.length">
              <template
                v-for="(make, m) in carMakeList"
                :key="m"
              >
                <tr class="bg-white">
                  <td :class="[tableCol]">
                    {{ m + 1 }}
                  </td>
                  <td :class="[tableCol]">
                    {{ make.name }}
                  </td>
                  <td :class="[tableCol]">
                    <div class="flex items-center gap-x-2">
                      <ButtonEdit @click="setFormData(make)">
                        Edit
                      </ButtonEdit>
                      <ButtonDelete @click="handleDelete(make.id)">
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
                  colspan="3"
                >
                  No data exists
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <EditMake
      v-model:show-add-modal="showAddModal"
      v-model:form="form"
      :platform="platformName"
      @close="toggleAddModal"
      @update="setCarMakeList"
    />
    <ConfirmPopup
      v-model:show-confirm-popup="showConfirmModal"
      :platform="platformName"
      message="This action will result in the removal of all associated Insurance Cases and Model data. Are you certain you want to proceed with this deletion?"
      @confirm="confirmDelete"
    />
  </AuthenticatedLayout>
</template>
