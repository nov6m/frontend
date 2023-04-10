<template lang="pug">
img.v-img(
  v-if="isResponsiveImage"
  :alt="alt"
  :src="src"
  :loading="lazy ? 'lazy' : 'eager'"
  :style="styles"
)
picture.v-img-responsive(
  v-else-if="src"
)
  source(
    v-if="src.mobile"
    :srcset="src.mobile"
    :media="`(max-width: ${breakpoints.mobile}px)`"
  )
  source(
    v-if="src.notebook"
    :srcset="src.notebook"
    :media="`(max-width: ${breakpoints.notebook}px)`"
  )
  img(
    v-if="src.desktop"
    :src="src.desktop"
    :alt="alt"
  )
</template>

<script>
import { isString } from '@/core/utils/type'

export default {
  name: 'VImg',
  props: {
    alt: {
      type: String,
      default: ''
    },
    src: {
      type: [String, Object],
      default: ''
    },
    contain: {
      type: Boolean,
      default: false
    },
    cover: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: String,
      default: ''
    },
    minHeight: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    },
    breakpoints: {
      type: Object,
      default() {
        return {
          mobile: 768,
          notebook: 1024
        }
      }
    }
  },
  computed: {
    styles() {
      const styles = {}
      if (this.contain) {
        styles['object-fit'] = 'contain'
      }
      if (this.cover) {
        styles['object-fit'] = 'cover'
      }
      if (this.position) {
        styles['object-position'] = this.position
      }
      if (this.height) {
        styles.height = this.height
      }
      if (this.width) {
        styles.width = this.width
      }
      if (this.maxHeight) {
        styles.maxHeight = this.maxHeight
      }
      if (this.maxWidth) {
        styles.maxWidth = this.maxWidth
      }
      if (this.minWidth) {
        styles.minWidth = this.minWidth
      }
      if (this.minHeight) {
        styles.minHeight = this.minHeight
      }
      return styles
    },
    isResponsiveImage() {
      return isString(this.src)
    }
  }
}
</script>
