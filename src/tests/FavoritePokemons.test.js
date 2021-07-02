import React from 'react';
import { fireEvent } from '@testing-library/react';
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
  fireEvent.click(getByRole('checkbox'));
  history.push('/pokemons/4');
  fireEvent.click(getByRole('checkbox'));
  history.push('/favorites');
  expect(getAllByText(/kg/i).length).toEqual(2);
});
