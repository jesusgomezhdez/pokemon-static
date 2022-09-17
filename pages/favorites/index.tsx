import { Layout } from '../../components/layouts'
import { NextPage } from 'next';
import {FavoritePokemons, NoFavorites} from '../../components/ui';
import { useState, useEffect } from 'react';
import { localFavorites } from '../../utils';


const FavoritesPage:NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  useEffect(() => {
    const currentPokemons = localFavorites.pokemons()
    setFavoritePokemons(currentPokemons)
  }, [])
  return (
    <Layout title='Mis Favoritos'>
      {favoritePokemons.length > 0 ? (
        <FavoritePokemons favorites={favoritePokemons} />
      ) : <NoFavorites /> }
      
    </Layout>
  )
} 

export default FavoritesPage;