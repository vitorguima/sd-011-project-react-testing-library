import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Check the behavior of the FavoritePokemons page', () => {
  it('Check the message if the person doesn\'t have favorite pokemons', () => {
    const { getByText } = render(<FavoritePokemons />);
    const title = getByText(/Favorite pokémons/);
    const notPokemonsFound = getByText(/No favorite pokemon found/);

    expect(title.innerHTML).toBe(' Favorite pokémons ');
    expect(notPokemonsFound.innerHTML).toBe('No favorite pokemon found');
  });

  it('Check if it renders the favorite pokemon', () => {
    const favoritePokemons = [
      { id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight:
          {
            value: '6.0',
            measurementUnit: 'kg',
          },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' },
      { id: 10,
        name: 'Caterpie',
        type: 'Bug',
        averageWeight:
            {
              value: '2.9',
              measurementUnit: 'kg',
            },
        image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png' },
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
