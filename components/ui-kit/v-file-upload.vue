<template lang="pug">
.v-file-upload(
  @click="$refs.fileUpload.click()"
)
  input( ref="fileUpload" type="file" hidden @change="uploadHandler" :accept="accept" )
  .v-file-upload__head
    v-icon.v-file-upload__icon(
      :icon="value ? 'file' : 'scrap'"
    )
    span(
      v-show="!value"
      v-if="label"
    ) {{ label }}
    .v-file-upload__info(
      v-if="value"
    )
      .v-file-upload__name {{ name }}
      .v-file-upload__size {{ size }}
  .v-file-upload__text(
    v-show="!value"
    v-if="subtext"
  ) {{ subtext }}
  .v-file-upload__change(
    v-show="value"
  ) Изменить
</template>

<script>
import { getFileSize } from '@/core/utils/numberFormat'

export default {
  name: 'VFileUpload',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: ''
    },
    label: {
      type: String,
      default: 'Загрузить файл'
    },
    subtext: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      size: ''
    }
  },
  methods: {
    uploadHandler($event) {
      const file = $event.target.files[0]
      this.size = getFileSize(file.size)
      this.name = file.name
      this.$emit('input', file)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-file-upload {
  display: inline-flex;
  flex-direction: column;
  border: 2px dashed theme(grey-light);
  border-radius: theme(ui-radius);
  padding: 15px;
  color: theme(grey-dark);
  cursor: pointer;
  &__text {
    margin-top: 8px;
    text-align: center;
    font-size: 15px;
  }
  &__change {
    margin-top: 10px;
    text-align: left;
    padding-left: 32px;
    font-size: 14px;
    text-decoration: underline;
  }
  &__head {
    display: flex;
    align-items: center;
    span {
      font-weight: 600;
      font-size: 16px;
      text-decoration: underline;
    }
  }
  &__icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  &__name {
    color: theme(black-color);
    font-size: 14px;
    text-decoration: none;
  }
  &__size {
    text-transform: uppercase;
    font-size: 14px;
    color: theme(grey);
    text-decoration: none;
  }
}
</style>
