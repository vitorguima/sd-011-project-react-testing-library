import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import data from '../data';
import renderWithRouter from './renderWithRouter';

const pokemon = data[1];
const isPokemonFavoriteById = true;

describe('Testing Requirement 06 - Component Pokemon.js', () => {
  it('Test if page render a pokemon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );
    const pokeName = getByTestId('pokemon-name');
    const pokeType = getByTestId('pokemon-type');
    const pokeWeigth = getByTestId('pokemon-weight');
    const { averageWeight, image, name, type } = pokemon;
    const { measurementUnit, value } = averageWeight;
    const pokeImage = getByAltText(`${name} sprite`);
    const favoriteImgIcon = getByAltText(`${name} is marked as favorite`);

    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent(name);
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent(type);
    expect(pokeWeigth).toBeInTheDocument();
    expect(pokeWeigth).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', image);
    expect(pokeImage).toHaveAttribute('alt', `${name} sprite`);
    expect(favoriteImgIcon).toBeInTheDocument();
    expect(favoriteImgIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImgIcon).toHaveAttribute('alt', `${name} is marked as favorite`);
  });

  it('Test if link details pokemon redirect to details pokemon', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );
    const urlDetails = getByText('More details');
    expect(urlDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

    fireEvent.click(urlDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
  });
});
