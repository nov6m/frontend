<template lang="pug">
.v-text(
  v-if="text"
  v-html="text"
)
.v-text(
  v-else
)
  slot
</template>

<script>
export default {
  name: 'VText',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.v-text {
  &::v-deep(h1) {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 35px;
    @include below($desktopSml) {
      margin-bottom: 30px;
      font-size: 24px;
    }
    @include below($tablet) {
      margin-bottom: 25px;
      font-size: 20px;
    }
  }
  &::v-deep(h2) {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 35px;
    @include below($desktopSml) {
      font-size: 20px;
      margin-bottom: 25px;
    }
  }
  &::v-deep(h3) {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 28px;
    @include below($desktopSml) {
      font-size: 16px;
      margin-bottom: 18px;
    }
  }
  &::v-deep(p) {
    font-size: 20px;
    margin-bottom: 25px;
    line-height: 1.1;
    @include below($desktopSml) {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  &::v-deep(a) {
    color: theme(current-color);
    transition: color 0.2s ease;
    &:hover {
      color: theme(current-dark-color);
    }
  }
  &::v-deep(blockquote) {
    position: relative;
    border-radius: theme(ui-radius);
    padding: 38px 80px;
    background: theme(light);
    font-weight: 400;
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 15px;
    @include below($tablet) {
      margin-bottom: 10px;
      padding: 20px 20px 20px 60px;
    }
    &:before {
      content: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='17' viewBox='0 0 20 17' fill='none'><path d='M16.1933 8.46308C18.4175 8.46308 19.9163 10.0101 19.9163 12.3023C19.9163 14.3649 18.1937 16.0833 15.8604 16.0833C13.3048 16.0833 11.4163 14.0207 11.4163 10.87C11.4163 3.70875 16.6382 0.84425 19.9163 0.5V3.65067C17.6936 4.05158 15.1946 6.28567 15.0827 8.75067C15.1946 8.694 15.638 8.46308 16.1933 8.46308ZM4.86142 8.46308C7.08276 8.46308 8.58301 10.0101 8.58301 12.3023C8.58301 14.3649 6.86034 16.0833 4.52709 16.0833C1.97142 16.0833 0.0830078 14.0207 0.0830078 10.87C0.0830078 3.70875 5.30484 0.84425 8.58301 0.5V3.65067C6.36026 4.05158 3.86126 6.28567 3.74934 8.75067C3.86126 8.694 4.30467 8.46308 4.86142 8.46308Z' fill='%23B41337'/></svg>");
      position: absolute;
      left: 37px;
      top: 40px;
      @include below($tablet) {
        top: 20px;
        left: 20px;
      }
    }
  }
  &::v-deep(img) {
    border-radius: theme(ui-radius);
    max-width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
    width: unset !important;
    height: unset !important;
    @include below($tablet) {
      margin-bottom: 10px;
    }
  }
  &::v-deep(ul) {
    margin-bottom: 15px;
    @include below($tablet) {
      margin-bottom: 10px;
    }
  }
  &::v-deep(li) {
    padding-left: 29px;
    font-size: 15px;
    line-height: 1.1;
    position: relative;
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: theme(current-color);
      position: absolute;
      top: 10px;
      left: 9px;
      transform: translateY(-50%);
    }
  }
  &::v-deep(b),
  &::v-deep(strong) {
    font-weight: 600;
  }
}
</style>
