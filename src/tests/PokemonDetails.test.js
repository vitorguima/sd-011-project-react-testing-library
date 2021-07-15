import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing PokemonDetails.js', () => {
  test('if info about pokemon details show on the screen', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const detailsButton = getByText(/More details/i);
    fireEvent.click(detailsButton);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(detailsButton).not.toBeInTheDocument();
    expect(getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon/i)).toBeInTheDocument();
  });

  test('if there are a map with the locations of the pokemon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);

    const details = getByText('More details');
    fireEvent.click(details);

    const headLocations = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(headLocations.tagName).toBe('H2');

    const locations = getAllByAltText('Pikachu location');
    const length = 2;
    expect(locations.length).toBe(length);

    const source = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const nameLocation = getByText('Kanto Viridian Forest');

    expect(locations[0].src).toBe(source);
    expect(nameLocation).toBeInTheDocument();
  });

  test('if user can favorite a pokemon on details page', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More details/i);
    fireEvent.click(detailsButton);
    const favoritePoke = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoritePoke).toBeInTheDocument();
    fireEvent.click(favoritePoke);
    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    fireEvent.click(favoritePoke);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
