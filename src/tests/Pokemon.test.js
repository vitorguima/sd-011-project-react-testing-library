import React from 'react';
import { fireEvent } from '@testing-library/react';
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
const favoriteTrue = true;

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

  it('show img pokemon with "alt"', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonImage = getAllByRole('img');
    expect(pokemonImage[0].alt).toBe('Pikachu sprite');
    expect(pokemonImage[0].src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('show link with id to Details ', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonDetailsLink = getAllByRole('link');
    expect(pokemonDetailsLink[0].href).toBe('http://localhost/pokemons/25');
  });

  it('when click More details render Details whith path', () => {
    const { getAllByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonDetailsLink = getAllByRole('link');
    fireEvent.click(pokemonDetailsLink[0]);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('have a star icon in favorites pokemons', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favoriteTrue }
      />,
    );
    const pokemonFavoriteIcon = getAllByRole('img');
    expect(pokemonFavoriteIcon[1].src).toBe('http://localhost/star-icon.svg');
    expect(pokemonFavoriteIcon[1].alt).toBe('Pikachu is marked as favorite');
  });
});
