export const loadStyles = (styles) => {
  if (styles) {
    const stylesBlock = document.createElement('style')
    stylesBlock.innerHTML = styles
    document
      .querySelector('head')
      .insertAdjacentElement('beforeend', stylesBlock)
  }
}
export const loadScripts = (scripts) => {
  if (scripts) {
    document.querySelector('body').insertAdjacentHTML('beforeend', scripts)
  }
}
