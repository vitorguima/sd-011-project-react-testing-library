import React from 'react';
import { fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemon = pokemons[0];
const detailsText = 'More details';

describe('Verifies if the PokemonDetails component', () => {
  it('renders the Pokémon info', () => {
    const { getByText } = renderWithRouter(<App />);
    const DetailsLink = getByText(detailsText);
    fireEvent.click(DetailsLink);

    expect(getByText(`${pokemon.name} Details`)).toBeInTheDocument();
    expect(DetailsLink).not.toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText(pokemon.summary)).toBeInTheDocument();
  });
  it('renders location section', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const DetailsLink = getByText(detailsText);
    fireEvent.click(DetailsLink);

    expect(getByText(`Game Locations of ${pokemon.name}`)).toBeInTheDocument();
    const locationImgs = getAllByAltText(`${pokemon.name} location`);
    expect(locationImgs.length).toBe(pokemon.foundAt.length);
    for (let i = 0; i < locationImgs.length; i += 1) {
      const img = locationImgs[i];
      expect(img.src).toBe(pokemon.foundAt[i].map);
    }
  });
  it('renders location section', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const DetailsLink = getByText(detailsText);
    fireEvent.click(DetailsLink);

    const checkFav = getByLabelText(/Pokémon favoritado?/i);
    expect(checkFav).toBeInTheDocument();
    fireEvent.click(checkFav);
    const starImg = getByAltText(`${pokemon.name} is marked as favorite`);
    expect(starImg).toBeInTheDocument();
    fireEvent.click(checkFav);
    expect(starImg).not.toBeInTheDocument();
  });
});
