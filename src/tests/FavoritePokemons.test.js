import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Test component Favorite Pokemons', () => {
  it('Test if appears message `No favorite pokemon found`', () => {
    const EMPTY_FAVORITE = '';
    const { getByText } = renderWithRouter(
      <FavoritePokemons myPokemon={ EMPTY_FAVORITE } />,
    );
    const emptyFavorite = getByText('No favorite pokemon found');
    expect(emptyFavorite).toBeInTheDocument();
  });

  it('Test if appears all cards off favorited pokémons', () => {
    const MY_POKEMON = [{
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
      summary: 'The flame on its tail shows the strength of its life force.',
    },
    ];

    const { container } = renderWithRouter(
      <FavoritePokemons pokemons={ MY_POKEMON } />,
    );
    const divCard = container.querySelector('.favorite-pokemons');
    expect(divCard).toBeInTheDocument();
    expect(divCard).toHaveTextContent(/Charmander/i);
  });
});
