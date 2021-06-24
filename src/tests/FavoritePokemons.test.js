import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Exibe a mensagem No favorite pokemon found, se não tiver pokémon favorito', () => {
  const { getByText } = render(<FavoritePokemons />);
  const message = getByText('No favorite pokemon found');
  expect(message).toBeInTheDocument();
});

test('É exibido todos os cards de pokémons favoritados', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const pikachuDetails = getByText('Pikachu Details');
  expect(pikachuDetails).toBeInTheDocument();
  const input = getByRole('checkbox');
  expect(input).toBeInTheDocument();
  fireEvent.click(input);
  history.push('/favorites');
  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});
