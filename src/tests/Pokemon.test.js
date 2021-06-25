import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('test the component Pokemon', () => {
  const { value, measurementUnit: unit } = pokemons[0].averageWeight;
  it('the pokemon info is proprely displayed', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByAltText(`${pokemons[0].name} sprite`);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
    expect(pokemonWeight).toHaveTextContent(`Average weight: ${value} ${unit}`);
    expect(pokemonImage.src).toEqual(pokemons[0].image);
  });

  it('shows a link when rendered in the pokedex redirects to the pokemons details page',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkMoreDetails = getByText('More details');
      expect(linkMoreDetails).toBeInTheDocument();
      expect(linkMoreDetails.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
      fireEvent.click(linkMoreDetails);
      const pokemonDetails = getByText(`${pokemons[0].name} Details`);
      expect(pokemonDetails).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toEqual(`/pokemons/${pokemons[0].id}`);
    });

  it('only shows a star icon on the favorite pokemons', () => {
    const { queryByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );
    const starImage = queryByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(starImage).toBeInTheDocument();
    expect(starImage.src).toEqual('http://localhost/star-icon.svg');
    cleanup();
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const notStarImage = queryByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(notStarImage).not.toBeInTheDocument();
  });
});
