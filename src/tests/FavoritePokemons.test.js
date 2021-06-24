import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Check the behavior of the FavoritePokemons page', () => {
  it('Check the message if the person doesn\'t have favorite pokemons', () => {
    const { getByText } = render(<FavoritePokemons />);
    const title = getByText(/Favorite pokémons/);
    const notPokemonsFound = getByText(/No favorite pokemon found/);

    expect(title).toHaveTextContent('Favorite pokémons');
    expect(notPokemonsFound).toHaveTextContent('No favorite pokemon found');
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
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonWeight)
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    });
  });
});
