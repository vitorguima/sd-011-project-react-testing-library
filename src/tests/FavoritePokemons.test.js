import { fireEvent } from '@testing-library/dom';
import React from 'react';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Tests in `/favorites` page', () => {
  it('Verify if `/favorites` contains first the text `No favorite pokemon found`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/favorites');
    const noFavoritePokemons = getByText('No favorite pokemon found');
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('Make the user way to favorite a pokemon and verify if it render in favorites',
    () => {
      const {
        getByText,
        getAllByRole,
        getByLabelText,
        getByTestId,
        history } = renderWithRouter(<App />);

      history.push('/');
      const buttons = getAllByRole('button');
      fireEvent.click(buttons[2]);
      fireEvent.click(getByText('More details'));
      fireEvent.click(getByLabelText('Pokémon favoritado?'));
      fireEvent.click(getByText('Favorite Pokémons'));
      const favoritePokemon = getByTestId('pokemon-name');
      expect(favoritePokemon.innerHTML).toBe('Charmander');
    });

  it('Make de user way to remove favorite pokemon', () => {
    const { getByText, getByLabelText, history } = renderWithRouter(<App />);

    history.push('/favorites');

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
