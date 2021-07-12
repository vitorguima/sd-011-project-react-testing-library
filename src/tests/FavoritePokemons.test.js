import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

const favorite = 'Favorite Pokémons';
const details = 'More details';

describe('FavoritePokemon tests', () => {
  it('renders message "No favorite pokemon found"', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByRole('link', { name: favorite }));
    const text = getByText('No favorite pokemon found');

    expect(text).toBeInTheDocument();
  });

  it('renders all favorites pokemons cards', () => {
    const { getByRole, getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByRole('link', { name: details }));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByRole('link', { name: favorite }));

    expect(getByText('Pikachu')).toBeInTheDocument();

    fireEvent.click(getByRole('link', { name: 'Home' }));
    fireEvent.click(getByRole('button', { name: 'Normal' }));
    fireEvent.click(getByRole('link', { name: details }));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByRole('link', { name: favorite }));

    expect(getByText('Snorlax')).toBeInTheDocument();

    fireEvent.click(getByRole('link', { name: 'Home' }));
    fireEvent.click(getByRole('button', { name: 'Dragon' }));
    fireEvent.click(getByRole('link', { name: details }));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByRole('link', { name: favorite }));

    expect(getByText('Dragonair')).toBeInTheDocument();

    let favoriteHeading = getByRole('heading', { level: 2 });
    expect(favoriteHeading).toBeInTheDocument();

    const favoritePokemons = favoriteHeading.nextElementSibling;
    const favoritesQuantity = 3;
    expect(favoritePokemons.children.length).toBe(favoritesQuantity);

    let detailsButtons = getAllByRole('link', { name: details });
    do {
      fireEvent.click(detailsButtons[0]);
      fireEvent.click(getByRole('checkbox'));
      fireEvent.click(getByRole('link', { name: favorite }));
      if (detailsButtons.length > 1) {
        detailsButtons = getAllByRole('link', { name: details });
      } else {
        detailsButtons.pop();
      }
    } while (detailsButtons.length > 0);

    favoriteHeading = getByRole('heading', { level: 2 });
    expect(favoriteHeading.nextElementSibling)
      .toHaveTextContent(/no favorite pokemon found/i);
  });
});
