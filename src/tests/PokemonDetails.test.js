import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Component Tests <PokemonDetails.js />', () => {
  it('Detailed information of the selected Pokémon is shown on the screen', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);
    userEvent.click(moreDetails);

    const pikachuDetails = getByText(/Pikachu Details/);
    expect(pikachuDetails).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summary = getByRole('heading', { level: 2, name: 'Summary' }).innerHTML;
    expect(summary).toBe('Summary');

    const p = getByText(/This intelligent Pokémon roasts hard berries with electricity/);
    expect(p).toBeInTheDocument();
  });

  it('There is a section on the page with maps containing the locations of the pokemon',
    () => {
      const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
      const moreDetails = getByText(/More details/);
      userEvent.click(moreDetails);

      const gamesLocations = getByRole('heading', {
        level: 2,
        name: 'Game Locations of Pikachu',
      }).innerHTML;
      expect(gamesLocations).toBe('Game Locations of Pikachu');

      const viridian = getByText(/Kanto Viridian Forest/);
      expect(viridian).toBeInTheDocument();

      const power = getByText(/Kanto Power Plant/);
      expect(power).toBeInTheDocument();

      const altLocation = 'Pikachu location';
      const imgLocations = getAllByRole('img', { alt: altLocation });
      const src1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const src2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
      expect(imgLocations[1].src).toBe(src1);
      expect(imgLocations[1].alt).toBe(altLocation);
      expect(imgLocations[2].src).toBe(src2);
      expect(imgLocations[2].alt).toBe(altLocation);
    });

  it('User can bookmark a pokemon through the details page', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);
    userEvent.click(moreDetails);

    const checkFavorite = getByRole('checkbox');
    expect(checkFavorite).toBeInTheDocument();

    const labelFavorite = getByText(/Pokémon favoritado?/);
    expect(labelFavorite).toBeInTheDocument();
  });
});
