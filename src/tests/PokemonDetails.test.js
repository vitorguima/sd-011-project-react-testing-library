import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import pokemons from '../data';

describe('Test pokemonDetails component', () => {
  it('Verify infos in details page', () => {
    const { getByText } = renderWithRouter(<App />);
    const getLinkUrl = getByText(/More details/);
    fireEvent.click(getLinkUrl);
    const checkText = getByText('Pikachu Details');
    expect(checkText).toBeInTheDocument();
    expect(getLinkUrl).not.toBeInTheDocument();
    const checkHead = getByText('Summary');
    expect(checkHead).toBeInTheDocument();
    const detailPokemon = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(detailPokemon).toBeInTheDocument();
  });

  it('Verify map location of pokemon', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const getLinkUrl = getByText(/More details/);
    fireEvent.click(getLinkUrl);
    const checkH2 = getByText('Game Locations of Pikachu');
    expect(checkH2).toBeInTheDocument();
    const locations = getAllByAltText('Pikachu location');
    expect(locations[0]).toBeInTheDocument();
    expect(locations[1]).toBeInTheDocument();
    expect(locations[0].src).toBeTruthy();
    expect(locations[1].src).toBeTruthy();
  });

  it('Check if favorite pokemon work in details page', () => {
    const { getByText, getByAltText, getByLabelText } = renderWithRouter(<App />);
    const getLinkUrl = getByText(/More details/);
    fireEvent.click(getLinkUrl);
    const favClick = getByLabelText(/Pokémon favoritado?/);
    fireEvent.click(favClick);
    const altFav = getByAltText(/is marked as favorite/i);
    expect(altFav).toBeInTheDocument();
    fireEvent.click(favClick);
    expect(altFav).not.toBeInTheDocument();
  });
});
