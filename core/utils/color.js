export const getRGBComponents = (color) => {
  const r = color.substring(1, 3)
  const g = color.substring(3, 5)
  const b = color.substring(5, 7)
  return {
    R: parseInt(r, 16),
    G: parseInt(g, 16),
    B: parseInt(b, 16)
  }
}
export const idealTextColor = (bgColor) => {
  if (typeof bgColor !== 'string') {
    return 'var(--black-color)'
  }
  if (bgColor.length === 4) {
    bgColor =
      '#' +
      bgColor[1] +
      bgColor[1] +
      bgColor[2] +
      bgColor[2] +
      bgColor[3] +
      bgColor
  }
  const nThreshold = 105
  const components = getRGBComponents(bgColor)
  const bgDelta =
    components.R * 0.299 + components.G * 0.587 + components.B * 0.114
  return 255 - bgDelta < nThreshold
    ? 'var(--black-color)'
    : 'var(--white-color)'
}
