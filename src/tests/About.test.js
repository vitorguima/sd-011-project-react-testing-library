import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

test('show infos about pokedex', () => {
  const { getByText } = render(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('show two p', () => {
  const { getByText } = render(<About />);
  const firstP = getByText(`This application simulates a Pokédex, 
  a digital encyclopedia containing 
  all Pokémons`);
  const secP = getByText(`One can filter Pokémons 
  by type, and see more details 
  for each one of them`);
  expect(firstP).toBeInTheDocument();
  expect(secP).toBeInTheDocument();
});

test('show img', () => {
  const { getByRole } = render(<About />);
  expect(getByRole('img').src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
