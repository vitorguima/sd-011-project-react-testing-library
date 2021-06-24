import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  const pokemons = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    },
  ];

  it('se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons pokemons={ [] } />);
    const heading = getByText(/No favorite pokemon found/i);
    expect(heading).toBeInTheDocument();
  });
  it('se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <FavoritePokemons
        pokemons={ pokemons }
      />,
    );
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const image = getByAltText('Pikachu sprite');
    const imageFavorite = getByAltText('Pikachu is marked as favorite');

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imageFavorite.src).toContain('/star-icon.svg');
  });
});
