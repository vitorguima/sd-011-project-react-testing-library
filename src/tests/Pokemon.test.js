import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';

const data = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard',
};

const favorite = false;

describe('When render Pokemon', () => {
  it('show name Pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  it('show type pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  it('show average weigth pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonAverageWeigth = getByTestId('pokemon-weight');
    expect(pokemonAverageWeigth.innerHTML).toBe('Average weight: 6.0 kg');
  });
});
