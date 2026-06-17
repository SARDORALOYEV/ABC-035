export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]')
}

export function isFavorite(id) {
  return getFavorites().includes(id)
}

export function toggleFavorite(id) {
  const ids = getFavorites()
  const next = ids.includes(id) ? ids.filter(f => f !== id) : [...ids, id]
  localStorage.setItem('favorites', JSON.stringify(next))
  return next
}
