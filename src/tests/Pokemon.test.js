import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Test the <Pokemon.js /> component', () => {
  const { getByText, getByAltText, history } = renderWithRouter(<App />);
  const btn = getByText('More details');
  fireEvent.click(btn);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
  expect(getByText('Electric')).toBeInTheDocument();
  expect(getByText('Summary')).toBeInTheDocument();
  expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
  const lbl = getByText('Pokémon favoritado?');
  fireEvent.click(lbl);
  const starIcon = getByAltText('Pikachu is marked as favorite');
  const pokIcon = getByAltText('Pikachu sprite');
  expect(pokIcon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
