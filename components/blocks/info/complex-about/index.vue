<template lang="pug">
.info-complex-about
  v-container
    .info-complex-about__head
      v-title.info-complex-about__title(
        tag="h2"
      ) О комплексе
      .info-complex-about__open(
        v-if="!display"
        @click="display = true"
      )
        | Развернуть
        v-icon.info-complex-about__open-icon(
          icon="arrow-down"
        )
    .info-complex-about__content(
      :class="{display}"
    )
      v-text.info-complex-about__text(
        v-if="text"
        v-html="text"
      )
      .info-complex-about__img-wrap(
        v-if="img"
      )
        v-img.info-complex-about__img(
          :src="img"
          contain
        )
        .info-complex-about__video( v-if='videoURL' @click="modalShow({name: 'video', params: {video: videoURL}})" )
          v-icon.info-complex-about__video-icon( icon='video-play' )
          | Смотреть видео
</template>

<script>
import { complexAboutInfoQuery } from '@/query'
import Api from '@/core/Api'

export default {
  name: 'InfoComplexAbout',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      display: false,
      text: '',
      img: '',
      videoURL: ''
    }
  },
  async fetch() {
    const { complex } = await Api.graphQL(complexAboutInfoQuery, {
      id: this.id
    })
    if (complex) {
      this.text = complex.about
      this.img = complex.imageAbout
      this.videoURL = complex.videoUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.info-complex-about {
  &__head {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
    @include below($tablet) {
      background: url('@/assets/img/about-complex.png') center bottom/cover
        no-repeat;
      height: 153px;
      margin: 0 -10px;
      padding: 30px 10px;
      text-align: center;
      display: flex;
      flex-direction: column;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    @include below($notebook) {
      grid-template-columns: 1fr;
      gap: 0;
    }
    @include below($tablet) {
      display: none;
      &.display {
        display: grid;
        position: relative;
        margin-top: -80px;
      }
    }
  }
  &__img-wrap {
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
  &__img {
    max-width: 100%;
    height: 100%;
    @include below($notebook) {
      width: 100%;
      max-width: unset;
    }
  }
  &__open {
    display: none;
    margin-top: auto;
    cursor: pointer;
    @include below($tablet) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-icon {
      width: 24px;
      height: 24px;
      color: theme(current-color);
      margin-top: 5px;
    }
  }
  &__video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-weight: 600;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: theme(white-color);
    cursor: pointer;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.7;
    }
    &-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
    }
  }
}
</style>
