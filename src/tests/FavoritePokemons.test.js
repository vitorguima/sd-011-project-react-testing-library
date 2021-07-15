import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Renders favorites Pokémons', () => {
  it('renders a text "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });

  it('renders favorited pokemon when requested"', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    userEvent.click(getByText('Home'));
    userEvent.click(getByText('More details'));
    userEvent.click(getByText('Pokémon favoritado?'));
    userEvent.click(getByText('Favorite Pokémons'));

    const pokemon = getByTestId('pokemon-name');

    expect(pokemon).toBeInTheDocument();
  });

  it('renders a message when no Pokémon is favorited', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});

// Source: consulta ao repositório https://github.com/tryber/sd-011-project-react-testing-library/pull/166/
