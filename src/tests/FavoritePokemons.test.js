import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

const favPokemon = [
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
  },
];

describe('Verifies the About component', () => {
  it('if there`s no favorite pokémons, renders a p saying so', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('renders cards for every favorited Pokémon', () => {
    const { container } = render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ favPokemon } />
      </MemoryRouter>,
    );

    const favPoks = container.querySelectorAll('.favorite-pokemon');
    expect(favPoks.length).toBe(2);
  });

  it('renders no cards if there`s no favorited Pokémon', () => {
    const { container } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const favPoks = container.querySelectorAll('.favorite-pokemon');
    expect(favPoks.length).toBe(0);
  });
});
