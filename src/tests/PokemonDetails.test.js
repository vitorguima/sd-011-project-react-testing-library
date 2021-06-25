import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';
import pokemons from '../data';

describe('PokemonDetails.js component', () => {
  const isPokemonFavoriteById = {
    23: true,
    25: true,
    4: false,
    10: false,
    65: true,
    151: false,
    78: true,
    143: false,
    148: false,
  };

  const match = {
    params: {
      id: '23',
    },
  };

  it('should display pokemon details', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const detailsTitle = screen.getByText(/Ekans Details/i);
    expect(detailsTitle).toBeVisible();
    expect(screen.queryByText(/More details/i)).toBeNull();
    const summaryHeading = screen.getByText(/Summary/i);
    expect(summaryHeading).toBeVisible();
    const detailsText = screen.getByText(/It can freely detach its jaw/i);
    expect(detailsText).toBeVisible();
  });

  it('should display a section with the location maps', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const mapsSectionTitle = screen.getByText(/Game Locations of Ekans/i);
    expect(mapsSectionTitle).toBeVisible();

    const locationName = screen.getByText(/Goldenrod Game Corner/i);
    const locationImg = screen.getByAltText(/Ekans location/i);
    expect(locationName).toBeVisible();
    expect(locationImg).toBeVisible();
    expect(locationImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
  });

  it('should be possible to mark a pokemon as favorite', () => {
    renderWithRouter(<App />);
    const moreDetailsButton = screen.getByText(/More details/i);
    fireEvent.click(moreDetailsButton);
    const markFavoriteInput = screen.getByText(/Pokémon favoritado/i);
    fireEvent.click(markFavoriteInput);
    const favoriteStar = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteStar).toBeVisible();
  });
});
