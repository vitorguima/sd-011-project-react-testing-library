import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const homeLinkName = 'Home';
const detailsLinkName = 'More details';
const favoriteLinkName = 'Favorite Pokémons';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

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

      const favoriteHeading = screen.getByText(/no favorite pokemon found/i);
      expect(favoriteHeading).toBeInTheDocument();
      expect(favoriteHeading.nextElementSibling).toBeNull();
    },
  );

  it('should display all pokémon cards if user has favorite pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    global.localStorage = new LocalStorageMock();

    fireEvent.click(screen.getByRole('link', { name: detailsLinkName }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: favoriteLinkName }));

    let favoriteHeading = screen.getByRole('heading', { level: 2 });
    expect(favoriteHeading).toBeInTheDocument();
    expect(favoriteHeading.innerHTML).toMatch(/favorite pokémons/i);
    expect(
      favoriteHeading.nextElementSibling.classList.contains('favorite-pokemons'),
    ).toBe(true);
    expect(favoriteHeading.nextElementSibling.children.length).toBe(1);

    fireEvent.click(screen.getByRole('link', { name: homeLinkName }));

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[5]);
    fireEvent.click(screen.getByRole('link', { name: detailsLinkName }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: favoriteLinkName }));

    favoriteHeading = screen.getByRole('heading', { level: 2 });
    expect(favoriteHeading).toBeInTheDocument();
    expect(favoriteHeading.innerHTML).toMatch(/favorite pokémons/i);
    expect(
      favoriteHeading.nextElementSibling.classList.contains('favorite-pokemons'),
    ).toBe(true);
    expect(favoriteHeading.nextElementSibling.children.length).toBe(2);

    let detailsButtons = screen.getAllByRole('link', { name: detailsLinkName });
    do {
      fireEvent.click(detailsButtons[0]);
      fireEvent.click(screen.getByRole('checkbox'));
      fireEvent.click(screen.getByRole('link', { name: favoriteLinkName }));
      favoriteHeading = screen.getByRole('heading', { level: 2 });
      if (detailsButtons.length > 1) {
        detailsButtons = screen.getAllByRole('link', { name: detailsLinkName });
      } else {
        detailsButtons.pop();
      }
    } while (detailsButtons.length > 0);

    favoriteHeading = screen.getByRole('heading', { level: 2 });
    expect(favoriteHeading.nextElementSibling)
      .toHaveTextContent(/no favorite pokemon found/i);
  });
});
