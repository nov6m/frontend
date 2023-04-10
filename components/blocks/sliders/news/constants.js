export const SWIPER_OPTIONS = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: false,
  navigation: {
    nextEl: '.sliders-news-next',
    prevEl: '.sliders-news-prev'
  },
  breakpoints: {
    568: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 4
    }
  }
}
