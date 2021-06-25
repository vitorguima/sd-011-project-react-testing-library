import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const homeLinkName = 'Home';
const detailsLinkName = 'More details';
const favoriteLinkName = 'Favorite Pokémons';

const resetFavorites = () => {
  let detailsButtons = screen.getAllByRole('link', { name: detailsLinkName });
  do {
    fireEvent.click(detailsButtons[0]);
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: favoriteLinkName }));
    if (detailsButtons.length > 1) {
      detailsButtons = screen.getAllByRole('link', { name: detailsLinkName });
    } else {
      detailsButtons.pop();
    }
  } while (detailsButtons.length > 0);
};

afterEach(cleanup);

describe('FavoritePokemons component tests', () => {
  it(
    'should display a message if user has no favorite pokémon and have no pokémon card',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      fireEvent.click(screen.getByRole('link', { name: favoriteLinkName }));

      const favoriteHeading = screen.getByRole('heading', { level: 2 });
      expect(favoriteHeading.nextElementSibling.firstChild)
        .toHaveTextContent(/no favorite pokemon found/i);
    },
  );

  it('should display all pokémon cards if user has favorite pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('link', { name: detailsLinkName }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: favoriteLinkName }));

    let favoriteHeading = screen.getByRole('heading', { level: 2 });
    expect(favoriteHeading).toHaveTextContent(/favorite pokémons/i);
    let favoritePokemonsElement = favoriteHeading.nextElementSibling;
    expect(favoritePokemonsElement.classList).toContain('favorite-pokemons');
    expect(favoritePokemonsElement.children).toHaveLength(1);

    fireEvent.click(screen.getByRole('link', { name: homeLinkName }));

    fireEvent.click(screen.getByRole('button', { name: 'Psychic' }));
    fireEvent.click(screen.getByRole('link', { name: detailsLinkName }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: favoriteLinkName }));

    favoriteHeading = screen.getByRole('heading', { level: 2 });
    expect(favoriteHeading).toBeInTheDocument();
    expect(favoriteHeading.innerHTML).toMatch(/favorite pokémons/i);
    favoritePokemonsElement = favoriteHeading.nextElementSibling;
    expect(favoritePokemonsElement.classList).toContain('favorite-pokemons');
    expect(favoritePokemonsElement.children).toHaveLength(2);

    resetFavorites();

    favoriteHeading = screen.getByRole('heading', { level: 2 });
    expect(favoriteHeading.nextElementSibling)
      .toHaveTextContent(/no favorite pokemon found/i);
  });
});
