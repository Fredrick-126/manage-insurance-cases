<template>
  <Transition
    enter-active-class="transition ease-out duration-350 sm:duration-300 transform"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition ease-out duration-350 sm:duration-300 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot />
  </Transition>
</template>
