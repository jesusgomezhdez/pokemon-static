import { Button, Card, Grid, Image, Text } from '@nextui-org/react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces'
import { HeartIcon } from '../../assets/icons'
import { getPokemonInfo, localFavorites } from '../../utils';
import { useEffect, useState } from 'react';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const allPokemons = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: allPokemons.map(id => ({
      params: { id }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const { id } = params as  {id:string}
  const pokemon = await getPokemonInfo(id)
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
    }
  }
}

export default PokemonPage;