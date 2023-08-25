<script setup>
import { Link } from '@inertiajs/vue3'
import ApplicationLogo from '@/Components/Common/ApplicationLogo.vue'
import NavLink from '@/Components/Common/NavLink.vue'
</script>

<template>
  <div>
    <div class="min-h-screen">
      <nav class="bg-white border-b border-gray-100">
        <!-- Primary Navigation Menu -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex w-full">
              <!-- Logo -->
              <div class="shrink-0 flex items-center">
                <Link :href="route('login')">
                  <ApplicationLogo
                    class="block h-9 w-auto fill-current text-gray-800"
                  />
                </Link>
              </div>

              <!-- Navigation Links -->
              <div class="space-x-8 ml-auto sm:-my-px sm:flex">
                <NavLink
                  v-if="route().current('register')"
                  :href="route('login')"
                >
                  Login
                </NavLink>
                <NavLink
                  v-if="route().current('login')"
                  :href="route('register')"
                >
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="h-container flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div
          class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
