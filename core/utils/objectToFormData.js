export const objectToFormData = (object, formData, namespace) => {
  const fd = formData || new FormData()
  let formKey

  Object.entries(object).forEach(([key, value]) => {
    const isObject = typeof value === 'object' && !(value instanceof File)
    formKey = namespace ? `${namespace}[${key}]` : key
    isObject ? objectToFormData(value, fd, formKey) : fd.append(formKey, value)
  })

  return fd
}
