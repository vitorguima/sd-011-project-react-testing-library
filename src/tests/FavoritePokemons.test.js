import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const noFavoritePokemons = [];
const favoritesPokemons = [
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
    summary: ('This intelligent Pokémon roasts hard berries'
    + 'with electricity to make them tender enough to eat.'),
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: ('The flame on its tail shows the strength of its'
    + 'life force. If it is weak, the flame also burns weakly.'),
  },
];

describe('When render FavoritePokemons', () => {
  it('Have no favorites pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFound = getByText('No favorite pokemon found');
    expect(noFound).toBeInTheDocument();
  });

  it('Have favorites pokemons', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritesPokemons } />,
    );
    const divPokemon = getAllByTestId('pokemon-name');
    expect(divPokemon.length).toBe(2);
  });

  it('favorites pokemons is a empty array', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ noFavoritePokemons } />,
    );
    const noPokemon = getByText('No favorite pokemon found');
    expect(noPokemon).toBeInTheDocument();
  });
});
