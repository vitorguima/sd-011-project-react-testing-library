import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const pokemons = [
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
    summary: `For protection,
     it releases a horrible stench from the antennae on its head to drive away enemies.`,
  },
];

describe('Test the <FavoritePokemons.js /> component', () => {
  it('Tests if the message No favorite pokemon found is displayed on the screen',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
      expect(getByText('No favorite pokemon found')).toBeInTheDocument();
    });
  it('Tests if all favorite Pokemon cards are displayed',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
      expect(getByText('Caterpie')).toBeInTheDocument();
    });
});
