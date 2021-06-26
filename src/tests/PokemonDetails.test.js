import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';
import pokemons from '../data';

describe('test the component "PokemonDetails"', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  const match = {
    path: '/pokemons/:id',
    url: '/pokemons/25',
    isExact: true,
    params: { id: '25' },
  };
  it('shows the detailed info of the pokemon', () => {
    const { queryByText, getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        pokemons={ pokemons }
        match={ match }
      />,
    );
    const detailsTitle = getByText(`${pokemons[0].name} Details`);
    expect(detailsTitle).toBeInTheDocument();
    const moreDetailsLink = queryByText('More details');
    expect(moreDetailsLink).not.toBeInTheDocument();
    const summaryTitle = getByText(/summary/i);
    expect(summaryTitle).toBeInTheDocument();
    const summary = getByText(/This intelligent Pokémon/);
    expect(summary).toBeInTheDocument();
  });

  it('shows the maps and location of the pokemon', () => {
    const locationsSize = 2;
    const { getAllByAltText, getByText, getAllByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        pokemons={ pokemons }
        match={ match }
      />,
    );
    const locationsTitle = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(locationsTitle).toBeInTheDocument();
    const locationsImages = getAllByAltText(`${pokemons[0].name} location`);
    expect(locationsImages).toHaveLength(locationsSize);
    const locationsText = getAllByText(/kanto/i);
    expect(locationsText).toHaveLength(locationsSize);
    expect(locationsImages[0].src).toEqual(pokemons[0].foundAt[0].map);
    expect(locationsImages[1].src).toEqual(pokemons[0].foundAt[1].map);
  });
  it('test if the user can mark the pokemon as a favorite', () => {
    const {
      getByLabelText,
      getByRole,
      getByText,
      queryByAltText,
    } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const favoriteCheckbox = getByLabelText(/Pokémon favoritado?/i);
    const checkbox = getByRole('checkbox');
    expect(favoriteCheckbox).toStrictEqual(checkbox);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(queryByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(queryByAltText('Pikachu is marked as favorite')).not.toBeInTheDocument();
  });
});
