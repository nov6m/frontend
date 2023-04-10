<template lang="pug">
.v-share(
  v-click-outside="close"
)
  slot
  transition(name="fade")
    .v-share__content(
      v-show="value"
    )
      v-link.v-share__item(
        :to="getUrl.tg"
        target="_blank"
        external
      )
        v-icon.v-share__icon(
          icon="telegram"
        )
        | Отправить в Telegram
      v-link.v-share__item(
        :to="getUrl.vk"
        target="_blank"
        external
      )
        v-icon.v-share__icon(
          icon="vk"
        )
        | Отправить в Vkontakte
      v-link.v-share__item(
        :to="getUrl.vb"
        target="_blank"
        external
      )
        v-icon.v-share__icon(
          icon="viber"
        )
        | Отправить в Viber
      v-link.v-share__item(
        :to="getUrl.wa"
        target="_blank"
        external
      )
        v-icon.v-share__icon(
          icon="whatsapp"
        )
        | Отправить в WhatsApp
      .v-share__item(
        @click="copyLink"
        :class="{copied}"
      )
        v-icon.v-share__icon(
          icon="link"
        )
        | {{ copied ? 'Ссылка скопирована' : 'Скопировать ссылку' }}
</template>

<script>
import { copyTextToClipboard } from '@/core/utils/copyToClipboard'

export default {
  name: 'VShare',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      copied: false
    }
  },
  computed: {
    getUrl() {
      return {
        vk: `https://vk.com/share.php?url=${this.url}`,
        tg: `https://t.me/share/url?url=${this.url}${
          this.text ? '&text=' + this.text : ''
        }`,
        wa: `https://api.whatsapp.com/send?text=${this.url}`,
        vb: `viber://forward?text=${this.url}`
      }
    }
  },
  methods: {
    copyLink() {
      if (process.client) {
        copyTextToClipboard(location.href)
        this.copied = true
      }
    },
    close() {
      this.$emit('input', false)
      this.copied = false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-share {
  display: inline-block;
  position: relative;
  &__content {
    position: absolute;
    top: -10px;
    transform: translateY(-100%);
    right: 0;
    box-shadow: 0px 0px 10px rgba(140, 140, 140, 0.25);
    border-radius: theme(ui-radius-small);
    background-color: theme(white-color);
    min-width: 210px;
    @include below($mobileDef) {
      right: 50%;
      transform: translateY(-100%) translateX(50%);
    }
  }
  &__icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  &__item {
    padding: 6px 13px;
    color: theme(grey-dark);
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.15s ease;
    &:hover {
      background-color: #f4f4f4;
    }
    &.copied {
      background-color: theme(current-extra-light-color);
      color: theme(current-color);
    }
  }
}
</style>
