import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';

test('show `No Favorite Pokemon Found` if the user hasn`t favorited any Pokemon', () => {
  const { getByText } = render(<FavoritePokemons />);

  const withoutFavoritedPokemonsMsg = getByText(/No favorite pokemon found/i);

  expect(withoutFavoritedPokemonsMsg).toBeInTheDocument();
});

test('show all favorited pokemons', () => {
  const data = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [{
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      { location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }],
      summary: 'This intelligent Pokémon roasts hard berries with'
    + 'with electricity to make them tender enough to eat.',
    },
    {
      id: 26,
      name: 'Pikachu2',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [{
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      { location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }],
      summary: 'This intelligent Pokémon roasts hard berries with'
    + 'with electricity to make them tender enough to eat.',
    },
  ];

  const { getAllByRole } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ data } />
    </MemoryRouter>,
  );

  const pokemons = getAllByRole('link', { name: 'More details' });

  pokemons.forEach((pokemon) => expect(pokemon).toBeInTheDocument());
});

test('show no cards if you don`t have favorite pokemons', () => {
  const data = [];

  const { queryAllByRole } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ data } />
    </MemoryRouter>,
  );

  const pokemons = queryAllByRole('link', { name: 'More details' });

  expect(pokemons).toHaveLength(0);
});
