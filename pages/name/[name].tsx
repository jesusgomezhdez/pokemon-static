import { Button, Card, Grid, Image, Text } from '@nextui-org/react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { HeartIcon } from '../../assets/icons'
import { getPokemonInfo, localFavorites } from '../../utils';
import { useEffect, useState } from 'react';
import { PokemonListResponse, Pokemon } from '../../interfaces';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(localFavorites.isFavorite(pokemon.id))
  const onToogleFavorite = () => {
    setIsFavorite(!isFavorite)
    localFavorites.toogleFavorite(pokemon.id)
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container gap={2}>
        <Grid xs={12} sm={4} >
          <Card isHoverable>
            <Card.Header css={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button
                auto
                color="error"
                bordered={!isFavorite}
                icon={<HeartIcon fill="currentColor" filled />}
                onClick={onToogleFavorite}
              />
            </Card.Header>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default!}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header>
              <Text
                h1
                size={40}
                css={{
                  textGradient: "45deg, $yellow600 -20%, $red600 100%",
                  width: '100%',
                  textAlign: 'center'
                }}
                weight="bold"
                transform='capitalize'
              >
                {pokemon.name}
              </Text>
            </Card.Header>
            <Card.Body>
              <Text h4>Sprites:</Text>
              <Grid.Container>
                <Grid xs={6} sm={3}>
                  <Image 
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                </Grid>
                <Grid xs={6} sm={3}>
                  <Image 
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                </Grid>
                <Grid xs={6} sm={3}>
                  <Image 
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                </Grid>
                <Grid xs={6} sm={3}>
                  <Image 
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
//StaticPaths siempre necesita trabajar en conjunto con StaticProps
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemons: string[] = data.results.map(pokemon => pokemon.name)
  return {
    paths: pokemons.map(name => ({
      params: { name }
    })),
    fallback: 'blocking' //GENERACION DE PAGINAS QUE NO SE GENERARON EN BUILD TIME - ISG
  }
}
//StaticProps no siempre necesesitara a StaticPaths
export const getStaticProps: GetStaticProps = async ({params}) => {
  const { name } = params as  {name:string}
  const pokemon = await getPokemonInfo(name)
  //VALIDACION PARA TENER EL ISG
  if(!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      pokemon
    },
    revalidate: 86400 //Re revalida la información de la página cada 24hras
  }
}

export default PokemonByNamePage;