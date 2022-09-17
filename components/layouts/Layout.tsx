import React, { FC } from 'react'
import Head from 'next/head'
import { Navbar } from '../ui';
import { Container, Spacer } from '@nextui-org/react';

interface Props {
  children: React.ReactNode;
  title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{title || 'PokemonApp'}</title>
        <meta name='author' content='Jesús Gómez' />
        <meta name='description' content={`Información sobre el pokémon ${title}`} />
        <meta name='keywords' content='pokemon, pokedex' />
        <meta property="og:title" content={`Información sobre el pokémon ${title}`} />
        <meta property="og:description" content={`Esta es la página sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <Navbar />
      <Spacer y={1} />
      <Container md>
        {children}
      </Container>
    </>
  )
}
