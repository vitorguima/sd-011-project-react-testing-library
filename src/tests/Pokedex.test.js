import React from 'react';

import App from '../App';
// import Pokedex from '../components/Pokedex';

import renderWithRouter from '../helpers/renderWithRouter';

describe('Tests in pokemons render on Home Page', () => {
  it('Verify if exists `h2` with `Encountered Pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2Element = getByRole('heading', { level: 2 });
    expect(h2Element.textContent).toBe('Encountered pokémons');
  });

  it('Verify if button `Next Pokemon` is working corretly', () => {
    // console.log();
  });
});
