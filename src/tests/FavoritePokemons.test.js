import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('if screen shows no favority pokemon found', () => {
  render(
    <BrowserRouter>
      <FavoritePokemons />
    </BrowserRouter>,
  );
  const msg = screen.getByText('No favorite pokemon found');
  expect(msg).toBeInTheDocument();
});

test('test if shows all favority pokemons card', () => {
  renderWithRouter(<App />);

  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
  const ckeckBox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
  userEvent.click(ckeckBox);
  const favoritStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoritStar).toBeInTheDocument();
});

test('test if no card of pokemon is show if its not favorited', () => {
  const favorite = [
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
      summary: 'This intelligent Pokémon roasts hard'
      + 'berries with electricity to make them tender enough to eat.',
    },
  ];
  const favoriteNone = [
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
      summary: 'The flame on its tail shows the strength of its life force.'
      + 'If it is weak, the flame also burns weakly.',
    },
  ];
  renderWithRouter(<FavoritePokemons pokemons={ favorite } />);
  favoriteNone.forEach((item) => {
    expect(screen.queryByText(item.name)).not.toBeInTheDocument();
  });
});
