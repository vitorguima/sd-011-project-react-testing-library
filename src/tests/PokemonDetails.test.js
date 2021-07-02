import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Test the <PokemonDetails.js /> component', () => {
  it('Test if the selected Pokémon is detailed information is displayed.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    const detailsName = getByRole('heading', {
      leval: 2,
      name: 'Pikachu Details',
    });
    const resume = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(detailsName).toBeInTheDocument();
    expect(resume).toBeInTheDocument();
    expect(getByText(/roasts hard berries with electricity/i)).toBeInTheDocument();
  });

  it('Test if there is a session with the maps containing the pokemon locations', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    const gameText = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    const image = getAllByRole('img')[1];
    expect(gameText).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image.alt).toBe('Pikachu location');
  });

  it('Test if the user can bookmark a pokemon through the details page', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    const favorited = getByText('Pokémon favoritado?');
    expect(favorited).toBeInTheDocument();
  });
});
