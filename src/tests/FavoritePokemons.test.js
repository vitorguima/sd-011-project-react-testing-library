import React from 'react';
import { fireEvent } from '@testing-library/dom';

import renderWithHistory from './helpers/renderWithHistory';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Quando não há pokémon favoritado', () => {
  let getByText;
  let getByTestId;

  beforeEach(() => {
    ({ getByText, getByTestId } = renderWithHistory(<FavoritePokemons />));
  });

  it('mostra texto indicando que não há pokémon favoritado.', () => {
    expect(getByText('No favorite pokemon found')).not.toBeInTheDocument();
  });
});
