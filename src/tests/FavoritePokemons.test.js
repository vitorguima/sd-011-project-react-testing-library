import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Tests of Favorite Pokemons Component', () => {
  test('test if has no favorited pokemon show text No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFavorite = getByText(/No favorite pokemon found/);
    const text = getByText(/Favorite pokémons/);
    expect(noFavorite).toHaveTextContent('No favorite pokemon found');
    expect(text).toHaveTextContent('Favorite pokémons');
  });
  test('test if has favorited pokemon show cards of each', () => {
    const favoritePokemons = [
      { id: 78,
        name: 'Rapidash',
        type: 'Fire',
        averageWeight: {
          value: '95.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png' },
      { id: 143,
        name: 'Snorlax',
        type: 'Normal',
        averageWeight: {
          value: '460.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png' },
    ];

    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );

    favoritePokemons.forEach((pokemon) => {
      const { name, type, averageWeight } = pokemon;
      const { value, measurementUnit } = averageWeight;

      const pokemonName = getByText(name);
      const pokemonType = getByText(type);
      const pokemonWeight = getByText(`Average weight: ${value} ${measurementUnit}`);

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName.innerHTML).toBe(name);
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType.innerHTML).toBe(type);
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    });
  });
});
