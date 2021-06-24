import { getByText } from '@testing-library/dom';
import React from 'react'
import RenderWithRouter from '../components/RenderWithRouter'

describe('testa os elementos da aplicação Favorites Pokémons', () => {
  it('mensagem no favorite pokemon found', () => {
    const { container, history } = RenderWithRouter(<App />)
    history.push('/favorites/');
    const noMatch = getByText(/No favorite pokemon found/i)
    if (container.className('favorite-pokemons').lenght === 0) {
      expect(noMatch).toBeInTheDocument();
    }

  })
});
