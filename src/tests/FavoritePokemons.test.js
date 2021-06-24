import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Test the Favorite Pokémons requirements', () => {
  test('Test if the page contains the image of a Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoritePokemon = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemon);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Test if all favorite Pokemon cards are displayed', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    let moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    let favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const HomeButton = getByText('Home');
    fireEvent.click(HomeButton);
    const fireButton = getByText('Fire');
    fireEvent.click(fireButton);
    moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const linkFavorite = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorite);
    expect(getByText('Charmander')).toBeInTheDocument();
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
