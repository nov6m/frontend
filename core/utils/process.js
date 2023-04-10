export const isClient = process.client
export const isServer = !process.client
export const isDev = process.env.NODE_ENV !== 'production'
