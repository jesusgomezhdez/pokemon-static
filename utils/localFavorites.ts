
const toogleFavorite = (id: number) => {
  const currentFavorites = localStorage.getItem('favorites')
  let favorites: number[] = JSON.parse(currentFavorites || '[]')
  if(favorites.includes(id)){
    favorites = favorites.filter(pokeId => pokeId !== id)
  } else {
    favorites.push(id)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))

}

const isFavorite = (id: number): boolean => {
  if(typeof window === 'undefined') return false
  const currentFavorites = localStorage.getItem('favorites')
  const favorites: number[] = JSON.parse(currentFavorites || '[]')
  return favorites.includes(id)
}

export default {toogleFavorite, isFavorite}