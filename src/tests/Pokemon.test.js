import React from 'react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Check the functions of page pokemon', () => {
  it('Test if name is correct pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const { name } = pokemons[1];
    expect(getByTestId('pokemon-name')).toHaveTextContent(name);
  });
  it('Test if type is correct pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const { type } = pokemons[1];
    expect(getByTestId('pokemon-type')).toHaveTextContent(type);
  });
  it('Test the text with format', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const { averageWeight } = pokemons[1];
    const { value, measurementUnit } = averageWeight;
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });
  it('Test if there an image with alt', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const { image, name } = pokemons[1];
    expect(getByAltText(`${name} sprite`).src).toBe(image);
    expect(getByAltText(`${name} is marked as favorite`).src).toBe('http://localhost/star-icon.svg');
  });
  it('Test when clicked link navigation go to more details of pokemon', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const { id } = pokemons[1];
    expect(getByText('More details').href).toBe(`http://localhost/pokemons/${id}`);
  });
});
