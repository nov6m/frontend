<template>
  <div class="page" :data-route="$route.fullPath">
    <InfoAbout />
    <AwardsSlider />
    <AlternativeAbout :fields="aim" />
    <AwardsSlider :fields="awards" />
    <AlternativePromoBanner />
  </div>
</template>

<script>
import AlternativeAbout from '@/components/blocks/info/about/alternative'
import AwardsSlider from '@/components/blocks/sliders/awards/index'
import AlternativePromoBanner from '@/components/blocks/banners/promo/alternative'
import InfoAbout from '@/components/blocks/info/about/index'

export default {
  name: 'IndexPage',
  components: {
    InfoAbout,
    AlternativeAbout,
    AwardsSlider,
    AlternativePromoBanner
  },
  data() {
    return {
      aim: {
        title: 'Наша цель',
        subtitle: '',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        items: []
      },
      awards: {
        title: 'Наши достижения',
        items: [
          {
            img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
            year: 2023,
            description: 'Мы открылись во всех городах России'
          },
          {
            img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
            year: 2023,
            description: 'Мы открылись во всех городах России'
          },
          {
            img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
            year: 2023,
            description: 'Мы открылись во всех городах России'
          },
          {
            img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
            year: 2023,
            description: 'Мы открылись во всех городах России'
          },
          {
            img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
            year: 2023,
            description: 'Мы открылись во всех городах России'
          },
          {
            img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
            year: 2023,
            description: 'Мы открылись во всех городах России'
          },
          {
            img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
            year: 2023,
            description: 'Мы открылись во всех городах России'
          }
        ]
      }
    }
  }
}
</script>
