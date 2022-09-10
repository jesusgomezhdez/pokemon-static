import React, { FC } from 'react'
import Head from 'next/head'
import { Navbar } from '../ui';
import { Container, Spacer } from '@nextui-org/react';
 
interface Props {
  children: React.ReactNode;
  title?: string;
}

 export const Layout: FC<Props> = ({ children, title}) => {
   return ( 
     <>
      <Head>
        <title>{title || 'PokemonApp'}</title>
        <meta name='author' content='Jesús Gómez' />
        <meta name='description' content='Información sobre el pokemon XXXXX' />
        <meta name='keywords' content='pokemon, pokedex' />
      </Head>
      <Navbar/>
      <Spacer y={1}/>
      <Container md>
        {children}
      </Container>
     </>
   )
 }
 