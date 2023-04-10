import Vue from 'vue'
import VContainer from '@/components/ui-kit/v-container'
import VBtn from '@/components/ui-kit/v-btn'
import VCheckbox from '@/components/ui-kit/v-checkbox'
import VToggle from '@/components/ui-kit/v-toggle'
import VTextCheckbox from '@/components/ui-kit/v-text-checkbox'
import VRange from '@/components/ui-kit/v-range'
import VInput from '@/components/ui-kit/v-input'
import VLink from '@/components/ui-kit/v-link'
import VIcon from '@/components/ui-kit/v-icon'
import VSelect from '@/components/ui-kit/v-select'
import VIndent from '@/components/ui-kit/v-indent'
import VImg from '@/components/ui-kit/v-img'
import VTitle from '@/components/ui-kit/v-title'
import VDescription from '@/components/ui-kit/v-description'
import VTabs from '@/components/ui-kit/tabs/v-tabs'
import VTab from '@/components/ui-kit/tabs/v-tab'
import VSlider from '@/components/ui-kit/v-slider'
import VSwiper from '@/components/ui-kit/swiper/v-swiper'
import VSwiperNavigation from '@/components/ui-kit/swiper/v-swiper-navigation'
import VSwiperProgressbar from '@/components/ui-kit/swiper/v-swiper-progressbar'
import VSwiperThumb from '@/components/ui-kit/swiper/v-swiper-thumb'
import VSwiperSlide from '@/components/ui-kit/swiper/v-swiper-slide'
import VDisclaimer from '@/components/ui-kit/v-disclaimer'
import VDivider from '@/components/ui-kit/v-divider'
import VBreadcrumbs from '@/components/ui-kit/v-breadcrumbs'
import VPaginate from '@/components/ui-kit/v-paginate'
import VShare from '@/components/ui-kit/v-share'
import VLoader from '@/components/ui-kit/v-loader'
import VCircleProgress from '@/components/ui-kit/v-circle-progress'
import VScrollbar from '@/components/ui-kit/v-scrollbar'
import VText from '@/components/ui-kit/v-text'
import VBootstrapRow from '@/components/ui-kit/bootstrap/v-row'
import VBootstrapCol from '@/components/ui-kit/bootstrap/v-col'
import VTextarea from '@/components/ui-kit/v-textarea'
import VFileUpload from '@/components/ui-kit/v-file-upload'
import VAlert from '@/components/ui-kit/v-alert'
import VCountdown from '~/components/ui-kit/v-countdown'

const components = {
  VContainer,
  VBtn,
  VCheckbox,
  VToggle,
  VTextCheckbox,
  VRange,
  VInput,
  VLink,
  VIcon,
  VSelect,
  VIndent,
  VImg,
  VTitle,
  VDescription,
  VTabs,
  VTab,
  VSlider,
  VSwiper,
  VSwiperSlide,
  VSwiperThumb,
  VSwiperProgressbar,
  VSwiperNavigation,
  VDisclaimer,
  VDivider,
  VPaginate,
  VBreadcrumbs,
  VShare,
  VLoader,
  VCircleProgress,
  VScrollbar,
  VText,
  VBootstrapRow,
  VBootstrapCol,
  VTextarea,
  VFileUpload,
  VAlert,
  VCountdown
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
