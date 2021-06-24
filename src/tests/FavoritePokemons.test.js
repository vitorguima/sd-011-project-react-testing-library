import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<App />);
  const favoritePokemonsLink = getByText(/Favorite Pokémons/i);
  fireEvent.click(favoritePokemonsLink);
  const noFavoritePokemons = getByText(/No favorite pokemon found/i);
  expect(noFavoritePokemons).toBeInTheDocument();
});
