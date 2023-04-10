<template lang="pug">
v-container
  v-text( v-html="fields.content" )
  //constructor-content(
  //  v-for="(row, rowIdx) in content"
  //  :key="rowIdx"
  //  :row="row"
  //)
</template>

<script>
// import ConstructorContent from './shared/components/constructor-content'
// import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'BlockConstructor',
  // components: { ConstructorContent },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  }
  // data () {
  //   return {
  //     content: [
  //       {
  //         'no-gutters': false,
  //         class: '',
  //         style: '',
  //         cols: [
  //           {
  //             col: 12,
  //             sm: 12,
  //             md: 12,
  //             lg: 6,
  //             xl: 6,
  //             element: 'editor',
  //             style: '',
  //             content: `
  //               <h1>Женщина на высоте: крановщица «ЛистПромСтрой» рассказывает о своей работе</h1>
  //               <p>Каждый год второе воскресенье августа все строители отмечают профессиональный праздник.
  //                   Строительство – это не просто профессиональная сфера, это призвание, большая ответственность и осознание того, что ты своими руками возводишь значимые для жизни города объекты: новые дома, больницы, школы, детские сады, заводы.</p>
  //               <p>Каково это всю жизнь посвятить такому важному ремеслу? В предверии Дня строителя Плакунова Надежда Леонтьевна, крановщица «ЛистПромСтрой», поделилась своей историей, рассказала об особенностях работы на башенном кране и о том, как женщина справляется со сложной мужской профессией.</p>
  //             `
  //           },
  //           {
  //             col: 12,
  //             sm: 12,
  //             md: 12,
  //             lg: 6,
  //             xl: 6,
  //             element: 'img',
  //             style: 'width: 100%; max-height: 300px; object-fit: cover; border-radius: 6px',
  //             content: {
  //               src: 'https://s1.1zoom.ru/big7/984/Canada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_2560x1600.jpg'
  //             }
  //           },
  //           {
  //             col: 12,
  //             sm: 12,
  //             md: 12,
  //             lg: 12,
  //             xl: 12,
  //             element: 'editor',
  //             style: 'margin-top: 15px;',
  //             content: `
  //               <blockquote>Я работаю на башенном кране уже 16 лет. Пришла в профессию в 45, после того, как первый раз поднялась в кабину крана на работе у мужа, он, кстати, тоже крановщик. Тогда поняла, что спускаться уже не хочу. Люблю высоту! Конечно, вначале было страшно, работа на кране – большая ответственность. Плюс требуется хорошая физическая подготовка. Чтобы подняться в кабину нужно поочередно пройти все секции крана пешком, никаких подъёмников и лифта. Так что, каждый рабочий день начинается с зарядки, — рассказывает Надежда.</blockquote>
  //             `
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // },
  // methods: {
  //   isNotEmptyArray
  // }
}
</script>

<style lang="scss">
.constructor {
  overflow: hidden;
}
</style>
