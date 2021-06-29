import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('', () => {
  const mew = pokemons[5];
  const { click } = fireEvent;
  test(`Checks if you are rendering a card with 
  the information of a certain Pokemon.`, () => {
    renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mew }
      />,
    );

    expect(screen.getByTestId('pokemon-name').textContent).toBe('Mew');
    expect(screen.getByTestId('pokemon-type').textContent).toBe('Psychic');
    expect(screen.getByTestId('pokemon-weight')
      .textContent).toBe('Average weight: 4.0 kg');
    expect(screen.getByAltText('Mew sprite')
      .getAttribute('src')).toBe(mew.image);
  });

  test(`Checks if the Pokémon card indicated in the Pokédex contains a navigation link 
  to view details of this Pokémon. The link must have the URL '/pokemons/<id>', 
  where '<id>' is the id of the displayed Pokemon.`, () => {
    renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mew }
      />,
    );
    const linkMoreDetails = screen.getByText('More details');

    expect(linkMoreDetails.getAttribute('href')).toBe('/pokemons/151');
  });

  test(`Checks if clicking on the Pokémon navigation link redirects 
  the application to the Pokémon details page.`, () => {
    const { history } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mew }
      />,
    );
    const linkMoreDetails = screen.getByText('More details');

    click(linkMoreDetails);

    expect(history.location.pathname).toBe('/pokemons/151');
  });

  test('Checks if there is a star icon in favorite Pokemons.', () => {
    const { container } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mew }
      />,
    );
    const iconFavoritePokemon = container.querySelector('.favorite-icon');

    expect(iconFavoritePokemon.getAttribute('src')).toBe('/star-icon.svg');
    expect(iconFavoritePokemon.alt).toBe('Mew is marked as favorite');
  });
});
