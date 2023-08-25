<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import Checkbox from '@/Components/Common/Checkbox.vue'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/Common/InputError.vue'
import InputLabel from '@/Components/Common/InputLabel.vue'
import PrimaryButton from '@/Components/Common/PrimaryButton.vue'
import TextInput from '@/Components/Common/TextInput.vue'

defineProps({
  canResetPassword: {
    type: Boolean,
  },
  status: {
    type: String,
  },
})

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const submit = () => {
  form.post(route('login'), {
    onFinish: () => form.reset('password'),
  })
}
</script>

<template>
  <GuestLayout>
    <Head title="Log in">
      <title>Log in</title>
    </Head>

    <div
      v-if="status"
      class="mb-4 font-medium text-sm text-green-600"
    >
      {{ status }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <InputLabel
          for="email"
          value="Email"
        />

        <TextInput
          id="email"
          v-model="form.email"
          autocomplete="username"
          autofocus
          class="mt-1 block w-full"
          required
          type="email"
        />

        <InputError
          :message="form.errors.email"
          class="mt-2"
        />
      </div>

      <div class="mt-4">
        <InputLabel
          for="password"
          value="Password"
        />

        <TextInput
          id="password"
          v-model="form.password"
          autocomplete="current-password"
          class="mt-1 block w-full"
          required
          type="password"
        />

        <InputError
          :message="form.errors.password"
          class="mt-2"
        />
      </div>

      <div class="block mt-4">
        <label class="flex items-center">
          <Checkbox
            v-model:checked="form.remember"
            name="remember"
          />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <Link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Forgot your password?
        </Link>

        <PrimaryButton
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          class="ml-4"
        >
          Log in
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
