export function hotelAsset(filename) {
  return `${import.meta.env.BASE_URL}hotel/${encodeURIComponent(filename)}`
}

export function sitePath(path = '/') {
  const route = path.replace(/^\/+/, '')
  return route ? `${import.meta.env.BASE_URL}#/${route}` : import.meta.env.BASE_URL
}