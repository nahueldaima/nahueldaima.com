<script>
export default {
  props: {
    showIcon: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      required: false,
      default: 'material-symbols:light-mode-rounded',
    },
    size: {
      type: Number,
      default: 20,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    classes: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
}
</script>

<template>
  <button
    :disabled="disabled" class="text-white hover:bg-zinc-900 hover:scale-110 border-2 border-black dark:border-white bg-black dark:bg-transparent pr-5 py-2 hover:cursor-pointer transition-all ease-out"
    :class="showIcon ? 'px-3' : 'px-5'" @click="$emit('click')"
  >
    <Icon v-if="showIcon" :name="iconName" :size="size" :class="classes" class="mr-2 mb-1" />
    <span class="text-lg"><slot /></span>
  </button>
</template>
