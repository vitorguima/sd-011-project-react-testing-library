import React from 'react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

test('when theres no pokemon', () => {
  const { getByTestId, getByAltText, getByText } = renderWithRouter(
    <Pokemon pokemon={ pokemons[1] } isFavorite />,
  );
  const { image, name, averageWeight, type, id } = pokemons[1];
  const { value, measurementUnit } = averageWeight;
  const pw = getByTestId('pokemon-weight');
  expect(getByTestId('pokemon-name')).toHaveTextContent(name);
  expect(getByTestId('pokemon-type')).toHaveTextContent(type);
  expect(pw).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  expect(getByAltText(`${name} sprite`).src).toBe(image);
  expect(getByAltText(`${name} is marked as favorite`).src).toBe('http://localhost/star-icon.svg');
  expect(getByText('More details').href).toBe(`http://localhost/pokemons/${id}`);
});
