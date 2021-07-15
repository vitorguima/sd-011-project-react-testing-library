import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('test component pokemon', () => {
  test('if render pokemon card', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[1] }
      isFavorite
    />);

    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Charmander');

    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toHaveTextContent('Fire');

    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent('Average weight: 8.5 kg');

    const pokeImage = getByAltText('Charmander sprite');
    expect(pokeImage.src).toBe('https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  test('if link to pokemon "more details" works', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
    const pokemonNameDetails = getByText(/Pikachu Details/i);
    expect(pokemonNameDetails).toBeInTheDocument();
  });

  test('if there are an star icon at favorite pokemon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const icon = getByAltText(/Pikachu is marked as favorite/i);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
