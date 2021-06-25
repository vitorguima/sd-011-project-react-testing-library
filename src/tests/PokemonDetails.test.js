import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('7- Test <PokemonDetails.js /> component', () => {
  const text = 'More details';
  it('Should render the Pokemon informatios on screen', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsBtn = getByText(text);

    fireEvent.click(detailsBtn);
    expect(detailsBtn).not.toBeInTheDocument();

    const pkmDetails = getByText(`${pokemons[0].name} Details`);
    const heading = getByText('Summary');
    const pkmResume = getByText(pokemons[0].summary);
    expect(pkmDetails).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(pkmResume).toBeInTheDocument();
  });

  it('Should render maps with the Pokemon locations', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const detailsBtn = getByText(text);

    fireEvent.click(detailsBtn);

    const locationTitle = getByText('Game Locations of Pikachu');
    expect(locationTitle).toBeInTheDocument();

    const map = getAllByAltText('Pikachu location');
    expect(map.length).toBeGreaterThan(0);

    const mapURL = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(map[0]).toHaveAttribute('src', mapURL);
  });

  it('Can favorite a Pokemon on the screen', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const detailsBtn = getByText('More details');

    fireEvent.click(detailsBtn);
    const favoriteBtn = getByLabelText('Pokémon favoritado?');
    expect(favoriteBtn).toBeInTheDocument();

    fireEvent.click(favoriteBtn);
    const star = getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();

    fireEvent.click(favoriteBtn);
    expect(star).not.toBeInTheDocument();
  });
});
