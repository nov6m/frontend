export const settingsByCodeQuery = `
query getSettingsByCode($code: String) {
  settingsByCode(code: $code) {
    settings
  }
}
`
