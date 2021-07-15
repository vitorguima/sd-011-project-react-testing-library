import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokeName = getByTestId('pokemon-name');
  expect(pokeName.innerHTML).toBe(pokemons[0].name);
  const pokeType = getByTestId('pokemon-type');
  expect(pokeType.innerHTML).toBe(pokemons[0].type);
  const pokeWeight = getByTestId('pokemon-weight');
  expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
  const pokeImg = getByAltText(`${pokeName.innerHTML} sprite`);
  expect(pokeImg).toHaveAttribute('src', pokemons[0].image);
});
