import { Grid } from '@nextui-org/react';
import { FC } from 'react'
import { FavoritePokemonsCard } from './FavoritePokemonsCard';

interface Props {
  favorites: number[]
}


export const FavoritePokemons: FC<Props> = ({ favorites }) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {favorites.map((id) => (
        <FavoritePokemonsCard id={id} key={id}/>
      ))}
    </Grid.Container>
  )
}

