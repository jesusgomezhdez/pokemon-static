import { Card, Grid } from '@nextui-org/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

interface Props {
  id: number
}
export const FavoritePokemonsCard: FC<Props> = ({id}) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/pokemon/${id}`)
  }
  return (
    <Grid xs={6} sm={6} md={4} lg={3} xl={3} key={id} >
      <Card isHoverable isPressable css={{ padding: 10 }} onClick={onClick}>
        <Card.Image width={'100px'} height={130} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} />
      </Card>
    </Grid>
  )
}