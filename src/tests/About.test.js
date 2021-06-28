import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

test('show infos about pokedex', () => {
  const { getByTestId } = render(<About />);
  expect(getByTestId('about-pokedex')).toBeInTheDocument();
  expect(getByTestId('about-pokedex')).toHaveTextContent('About Pokédex');
});

test('show img', () => {
  const { getByRole } = render(<About />);
  expect(getByRole('img').src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
