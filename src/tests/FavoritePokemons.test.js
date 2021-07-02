import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Test the <FavoritePokemons.js />', () => {
  it('Test message display if do not have favorite pokemons.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const messageDisplay = getByText(/No favorite pokemon found/i);

    expect(messageDisplay).toBeInTheDocument();
  });

  it('test all favorite pokemon cards exinbition', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    userEvent.click(getByText('Home'));
    userEvent.click(getByText('More details'));
    userEvent.click(getByText('Pokémon favoritado?'));
    userEvent.click(getByText('Favorite Pokémons'));

    const pokemonName = getByTestId('pokemon-name');

    expect(pokemonName).toBeInTheDocument();
  });

  it('Test card not showing if card is not favorited.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
