import React from 'react'
import { Container, Text, Image} from '@nextui-org/react';

export const NoFavorites = () => {
  return (
    <Container display='flex' justify='center' alignItems='center' fluid css={{
      height: 'calc(100vh - 100px)',
      flexDirection: 'column',
      alignSelf: 'center'
    }}>
      <Text h1>No hay favoritos</Text>
      <Image src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg' width={250} height={250} />
    </Container>
  )
}
