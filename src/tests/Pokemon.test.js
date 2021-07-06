import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Test the <Pokemon.js /> component', () => {
  const { getByText, getByAltText, getAllByText } = renderWithRouter(<App />);
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getAllByText('Electric').length).toBe(2);
  const btn = getByText('More details');
  fireEvent.click(btn);
  const lbl = getByText('Pokémon favoritado?');
  fireEvent.click(lbl);
  const starIcon = getByAltText('Pikachu is marked as favorite');
  const pokIcon = getByAltText('Pikachu sprite');
  expect(pokIcon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
