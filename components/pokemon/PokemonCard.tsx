import { FC } from 'react'
import { SmallPokemon } from '../../interfaces/pokemon-list';
import { Card, Col, Text, Grid } from "@nextui-org/react";
import { useRouter } from 'next/router';

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/name/${pokemon.name}`)
  }
  return (
    <Card isHoverable isPressable onClick={onClick}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            Nombre
          </Text>
          <Text h4 color="white" transform="uppercase" weight="bold">
            {pokemon.name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src={pokemon.image}
        objectFit="contain"
        width="100%"
        height={200}
        alt="Card image background"
      />
    </Card>
  )
}