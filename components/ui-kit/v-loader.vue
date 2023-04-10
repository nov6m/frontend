<template>
  <svg
    class="v-loader"
    :class="{ [mode]: mode }"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="currentColor"
      stroke-width="6"
      r="33"
      stroke-dasharray="155.50883635269477 53.83627878423159"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="0.9174311926605504s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
  </svg>
</template>

<script>
export default {
  name: 'VLoader',
  props: {
    mode: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-loader {
  &.default {
    color: theme(current-color);
    width: 50px;
    height: 50px;
  }
}
</style>
