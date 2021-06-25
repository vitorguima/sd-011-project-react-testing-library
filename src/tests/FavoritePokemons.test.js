import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testing Requirement 03 - Component FavoritePokemons.js', () => {
  it('Test if has No favorite pokemon found>', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Verify if exists any favorited pokemon', () => {
    const favorites = [
      {
        id: 10,
        name: 'Caterpie',
        type: 'Bug',
        averageWeight: {
          value: '2.9',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      },
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

    const {
      getByText,
      getByAltText,
    } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);

    // caterpie
    expect(getByText('Caterpie')).toBeInTheDocument();
    expect(getByText('Bug')).toBeInTheDocument();
    expect(getByText('Average weight: 2.9 kg')).toBeInTheDocument();
    const imageCaterpie = getByAltText(`${favorites[0].name} sprite`);
    expect(imageCaterpie).toBeInTheDocument();
    expect(imageCaterpie.src).toBe(favorites[0].image);

    // pikachu
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Electric')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    const imagePikachu = getByAltText(`${favorites[1].name} sprite`);
    expect(imagePikachu).toBeInTheDocument();
    expect(imagePikachu.src).toBe(favorites[1].image);
  });
});
