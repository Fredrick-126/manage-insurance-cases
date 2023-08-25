<template>
  <Transition
    enter-active-class="transition ease-out duration-300 transform"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-300 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot />
  </Transition>
</template>
