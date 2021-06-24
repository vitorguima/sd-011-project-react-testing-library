import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../components';

describe('Verifica requisito 3', () => {
  it('Teste se a pessoa não tiver pokémons favoritos..', () => {
    const NO_FAVORITE = '';
    renderWithRouter(
      <FavoritePokemons
        pokemons={ NO_FAVORITE }
      />,
    );
    const texto = screen.getByText(/No favorite pokemon found/i);
    expect(texto).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados..', () => {
    const FAVORITO = [{
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
      'This intelligent Pokémon roasts hard berries',
    },
    ];

     renderWithRouter(
      <FavoritePokemons
        pokemons={ FAVORITO }
      />,
    );
    const render = screen.getByTestId('renderiza-favorito');
    expect(render).toBeInTheDocument();
    expect(render).toHaveTextContent(/Pikachu/i);
  });
});
