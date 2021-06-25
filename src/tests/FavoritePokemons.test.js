import React from 'react';

import renderWithMemory from '../renderWithMemory';
import App from '../App';

const initialEntries = { initialEntries: ['/favorites'] };

test('Test favorites', () => {
  localStorage.setItem('favoritePokemonIds', '[25]');
  const { getByText } = renderWithMemory(<App />, initialEntries);

  expect(localStorage.length).toBeTruthy();
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByText('Electric')).toBeInTheDocument();
  expect(getByText(/6.0/)).toBeInTheDocument();
});

test('Test not favorites', () => {
  localStorage.clear();
  const { getByText } = renderWithMemory(<App />, initialEntries);

  expect(localStorage.length).toBeFalsy();
  const p = getByText('No favorite pokemon found');
  expect(p).toContainHTML('<p>No favorite pokemon found</p>');
});
