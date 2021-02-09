function getProperty (nesne, key) {
  if (!key) return nesne
  else if (typeof key === 'string') return nesne[key]
  else if (typeof key === 'function') return key(nesne)
}

export function localSort (dizi, key) {
  return [...dizi].sort((a, b) => getProperty(a, key).trim().localeCompare(getProperty(b, key).trim()))
}