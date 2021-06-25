import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';

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
    summary: 'The flame on its tail',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 30',
        map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
      },
      {
        location: 'Johto Route 31',
        map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
      },
      {
        location: 'Ilex Forest',
        map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
      },
      {
        location: 'Johto National Park',
        map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
      },
    ],
    summary: 'For protection, it releases a horrible stench',
  },
];

const favoritePokemons = [
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
    summary: 'This intelligent Pokémon roasts hard '
    + 'berries with electricity to make them tender enough to eat.',
  },
];

describe('When render Pokedex', () => {
  it('have a <h2> with "Encontered Pokemons"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ favoritePokemons }
      />,
    );
    const titlePokedex = getByRole('heading', { level: 2 });
    expect(titlePokedex.innerHTML).toBe('Encountered pokémons');
  });

  it('the next pokemon is called when button "Próximo pokemon" is clicked ', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ favoritePokemons }
      />,
    );
    const nextButton = getByText('Próximo pokémon');
    fireEvent.click(nextButton);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Charmander');
    fireEvent.click(nextButton);
    expect(pokemonName.innerHTML).toBe('Caterpie');
    fireEvent.click(nextButton);
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  it('click filter button and reset button', () => {
    const { getAllByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ favoritePokemons }
      />,
    );
    const buttonFiltered = getAllByTestId('pokemon-type-button');
    expect(buttonFiltered[0].innerHTML).toBe('Electric');
    const buttonNext = getAllByTestId('next-pokemon');
    fireEvent.click(buttonFiltered[0]);
    expect(buttonNext[0].disabled).toBe(true);
    const buttonReset = getByText('All');
    fireEvent.click(buttonReset);
    expect(buttonNext[0].disabled).toBe(false);
  });
});
