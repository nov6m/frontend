<template lang="pug">
.v-transform(
  :class="{grabbing: isGrab}"
  @mousedown.stop="startGrab"
  @touchstart.stop="startGrab"
  @mousewheel.stop.prevent="omMouseWheel"
)
  .v-transform__zoom
    v-icon.v-transform__zoom-plus( icon="plus-control" @click.stop="addZoom" :class="{disabled: zoom >= 2.5}" )
    v-icon.v-transform__zoom-minus( icon="minus-control" @click.stop="minusZoom" :class="{disabled: zoom <= 0.5}" )
  .v-transform__content(
    :style="{transform: `scale(${zoom}) translateX(${translateX}px) translateY(${translateY}px)`}"
  )
    slot
</template>

<script>
import { isClient } from '../../core/utils/process'

export default {
  name: 'VTransform',
  data() {
    return {
      zoom: 1,
      translateX: 0,
      translateY: 0,
      curCoordsDown: { x: 0, y: 0 },
      isGrab: false
    }
  },
  mounted() {
    window.addEventListener('mouseup', this.stopGrab)
    window.addEventListener('touchend', this.stopGrab)
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.stopGrab)
    window.removeEventListener('touchend', this.stopGrab)
  },
  methods: {
    omMouseWheel(e) {
      if (e.deltaY < 0) {
        this.addZoom()
      }
      if (e.deltaY > 0) {
        this.minusZoom()
      }
    },
    addZoom() {
      if (this.zoom >= 2.5) {
        return
      }
      this.zoom += 0.5
    },
    minusZoom() {
      if (this.zoom <= 0.5) {
        return
      }
      this.zoom -= 0.5
    },
    stopGrab(e) {
      e.stopPropagation()
      this.isGrab = false
      if (isClient) {
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('touchmove', this.onMouseMove)
        if (window.innerWidth <= 1024) {
          document.querySelector('body').classList.remove('vm--block-scroll')
        }
      }
    },
    startGrab(e) {
      this.isGrab = true
      if (isClient) {
        this.curCoordsDown.x = e.clientX
        this.curCoordsDown.y = e.clientY
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('touchmove', this.onMouseMove)
        if (window.innerWidth <= 1024) {
          document.querySelector('body').classList.add('vm--block-scroll')
        }
      }
    },
    onMouseMove(e) {
      const event = {
        clientX: e.clientX || e.changedTouches[0].clientX,
        clientY: e.clientY || e.changedTouches[0].clientY
      }
      if (this.isGrab) {
        if (this.curCoordsDown.x > event.clientX) {
          this.translateX -= (this.curCoordsDown.x - event.clientX) / this.zoom
        } else if (this.curCoordsDown.x < event.clientX) {
          this.translateX += (event.clientX - this.curCoordsDown.x) / this.zoom
        }
        if (this.curCoordsDown.y > event.clientY) {
          this.translateY -= (this.curCoordsDown.y - event.clientY) / this.zoom
        } else if (this.curCoordsDown.y < event.clientY) {
          this.translateY += (event.clientY - this.curCoordsDown.y) / this.zoom
        }
        this.curCoordsDown.x = event.clientX
        this.curCoordsDown.y = event.clientY
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-transform {
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  cursor: grab;
  &.grabbing {
    cursor: grabbing;
  }
  &__zoom {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #d6d6d6;
    border-radius: theme(ui-radius);
    height: 80px;
    width: 40px;
    padding: 12px 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: theme(white-color);
    z-index: 1;
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 6px;
      width: calc(100% - 12px);
      border-bottom: 1px solid #d6d6d6;
    }
    &-plus,
    &-minus {
      width: 16px;
      height: 16px;
      color: theme(current-color);
      cursor: pointer;
      &.disabled {
        pointer-events: none;
        color: theme(grey-dark);
      }
    }
  }
  &__content {
    transition: transform 0.2s linear;
    will-change: transform;
    width: 85%;
    @include below($tablet) {
      width: 100%;
    }
  }
}
</style>
