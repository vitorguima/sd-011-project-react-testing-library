import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('tests Pokemon component', () => {
  test('Test whether card with Pokémon information is rendered', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } />,
    );

    const name = getByTestId('pokemon-name');
    expect(name.textContent).toBe('Pikachu');

    const type = getByTestId('pokemon-type');
    expect(type.textContent).toBe('Electric');

    const weight = getByTestId('pokemon-weight');
    expect(weight.textContent).toBe('Average weight: 6.0 kg');

    const image = getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Test whether Pokémon in Pokédex have a navigation link', () => {
    const { history, getByText } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const link = getByText(/More Details/i);
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Test if favorite Pokemons has star', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );

    const favorite = getByAltText(/Pikachu is marked as favorite/);
    expect(favorite).toHaveAttribute('src',
      '/star-icon.svg');
  });
});
