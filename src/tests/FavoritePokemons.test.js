import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testing FavoritePokemons component', () => {
  it('the screen have `No favorite pokemon found` when really dont have any', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const favoriteLink = getByText(/favorite pokémons/i);
    fireEvent.click(favoriteLink);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('the screen dont have a pokemon card when dont have any favorite', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const favoriteLink = getByText(/favorite pokémons/i);
    fireEvent.click(favoriteLink);
    const card = container.querySelector('.favorite-pokemon');
    expect(card).not.toBeInTheDocument();
  });

  it('the screen have the correct pokemon card', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    const favoriteLink = getByText(/favorite pokémons/i);
    fireEvent.click(moreDetails);
    const favoritePokemon = container.querySelector('#favorite');
    fireEvent.click(favoritePokemon);
    fireEvent.click(favoriteLink);
    const cards = container.querySelectorAll('.favorite-pokemon');
    expect(cards.length).toBe(1);
  });
});
