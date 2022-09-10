import { Container, Text, Link } from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link';

export const Navbar = () => {
  return (
    <div style={{ backgroundColor: '#16181A', width: '100%' }}>
      <Container
        md
        display='flex'
        direction='row'
        alignItems='center'
        justify='space-between'
      >
        <NextLink href='/' passHref>
          <Link css={{display: 'flex', alignItems: 'center'}}>
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              alt='Icono de la app'
              width={70}
              height={70}
            />
            <Text
              size={40}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                flex: 1
              }}
              weight="bold">
              Pokemones
            </Text>
          </Link>
        </NextLink>
        <NextLink href='/favorites' passHref>
          <Link>
            <Text color="primary" h3>Favoritos</Text>
          </Link>
        </NextLink>
      </Container>
    </div>
  )
}