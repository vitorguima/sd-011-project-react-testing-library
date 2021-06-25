import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../components';
import FavoritePokemon from '../components/FavoritePokemons';
import App from '../App';

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
    summary:
      'This intelligent Pokémon ...',
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
    summary: 'The flame on its tail shows ...',
  },
];

describe('testing the FavoritePokemons component', () => {
  // eslint-disable-next-line max-len
  it('if renders \'No Favorite pokemon found\' if does not have any favorite pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon />);
    const noFavoriteFoundMsg = getByText('No favorite pokemon found');
    expect(noFavoriteFoundMsg).toBeInTheDocument();
  });

  it('testing if renders all favorite pokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    let moreDetailsBtn = getByText('More details');
    fireEvent.click(moreDetailsBtn);
    let favoriteBtn = getByText('Pokémon favoritado?');
    fireEvent.click(favoriteBtn);
    let favoriteCheckbox = document.querySelector('#favorite');
    expect(favoriteCheckbox).toBeChecked();

    const homeBtn = getByText('Home');
    fireEvent.click(homeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const nextPokemonBtn = getByText(/Próximo pokémon/i);
    fireEvent.click(nextPokemonBtn);
    let charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    moreDetailsBtn = getByText('More details');
    fireEvent.click(moreDetailsBtn);
    favoriteCheckbox = document.querySelector('#favorite');
    favoriteBtn = getByText('Pokémon favoritado?');
    fireEvent.click(favoriteBtn);
    expect(favoriteCheckbox).toBeChecked();

    const favoritePokemonsBtn = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemonsBtn);
    const pikachu = getByText(/pikachu/i);
    charmander = getByText(/charmander/i);
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });
});
