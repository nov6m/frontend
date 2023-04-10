<script>
import VTab from './v-tab'

export default {
  name: 'VTabs',
  components: {
    VTab
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    mode: {
      type: String,
      default: 'default'
    },
    nuxtLink: {
      type: Boolean,
      default: false
    }
  },
  render() {
    const onClickTab = (elem, i) => {
      this.$emit('input', i)
      if (elem?.componentOptions?.listeners?.click) {
        elem.componentOptions.listeners.click()
      }
    }
    const tabsList = (this.$slots?.default || []).map((el, i) => {
      if (el?.componentOptions?.tag !== 'v-tab') {
        return false
      }
      const propsData = el?.componentOptions?.propsData || {}
      const staticClasses = el.data?.staticClass || ''
      const dynamicClasses = Object.entries(el.data.class || {})
        .map((el) => (el[1] ? el[0] : ''))
        .join(' ')
      const isActive =
        'active' in propsData ? propsData.active : this.value === i
      return (
        <v-tab
          onClick={() => onClickTab(el, i)}
          active={isActive}
          class={`${staticClasses} ${dynamicClasses}`}
          mode={this.mode}
          link={this.nuxtLink}
          to={propsData.to}
        >
          {el.componentOptions.children}
        </v-tab>
      )
    })
    return <div class={`v-tabs ${this.mode}`}>{tabsList}</div>
  }
}
</script>

<style lang="scss" scoped>
.v-tabs {
  &.combined {
    display: flex;
  }
  &.default,
  &.underline,
  &.secondary {
    display: flex;
    flex-wrap: wrap;
  }
  &.secondary {
    background-color: #f3f3f3;
    padding: 4px 5px;
    border-radius: theme(ui-radius);
    @include below($tablet) {
      padding: 2px;
    }
  }
}
</style>
