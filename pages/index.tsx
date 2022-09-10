import type { NextPage, GetStaticProps } from 'next'
import { Button } from '@nextui-org/react';
import { Layout } from '../components/layouts';
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Card, Col, Text, Grid } from "@nextui-org/react";
import { PokemonCard } from '../components/pokemon';
interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokemon'>
      <Grid.Container gap={2} justify='center'>
        {pokemons.map((pokemon) => (
          <Grid xs={6} sm={3} md={4} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance. 
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')  // your fetch function here 

  const pokemons: SmallPokemon[] = data.results.map((res, index) => ({
    ...res,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }))

  console.log(data, 'data api')

  return {
    props: {
      pokemons
    }
  }
}

export default Home
