import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Test screen favorite message pokemon found', () => {
  const { queryByText, getByText } = renderWithRouter(<FavoritePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  expect(queryByText('Pikachu')).not.toBeInTheDocument();
  expect(queryByText('Charmander')).not.toBeInTheDocument();
  expect(queryByText('Caterpie')).not.toBeInTheDocument();
});

test('Test show cards pokemons favorite', () => {
  const { history, getAllByText, getByRole } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const favoritado = getByRole('checkbox');
  fireEvent.click(favoritado);
  history.push('/pokemons/4');
  fireEvent.click(favoritado);
  history.push('/favorites');
  const pokemon = getAllByText(/kg/i);
  expect(pokemon.length).toEqual(2);
});
