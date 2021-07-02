import React from 'react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

test('Teste o componente Pokemon.js', () => {
  const { getByText, getByAltText, getByTestId } = renderWithRouter(
    <Pokemon pokemon={ pokemons[1] } isFavorite />,
  );

  const { name, image, averageWeight, type, id } = pokemons[1];
  const { value, measurementUnit } = averageWeight;
  const pokeWeight = getByTestId('pokemon-weight');

  expect(getByText('More details').href).toBe(`http://localhost/pokemons/${id}`);
  expect(getByAltText(`${name} sprite`).src).toBe(image);
  expect(getByAltText(`${name} is marked as favorite`).src).toBe('http://localhost/star-icon.svg');
  expect(getByTestId('pokemon-name')).toHaveTextContent(name);
  expect(getByTestId('pokemon-type')).toHaveTextContent(type);
  expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
});
