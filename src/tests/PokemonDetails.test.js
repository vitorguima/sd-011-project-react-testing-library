import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const { summary, id, name, type, averageWeight, image, foundAt } = pokemons[0];
const { measurementUnit, value } = averageWeight;

test('Test the <Pokemon.js /> component', () => {
  const { getByText, getByAltText, history, getAllByAltText } = renderWithRouter(<App />);
  const btn = getByText('More details');
  fireEvent.click(btn);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${id}`);
  expect(getByText(`${name} Details`)).toBeInTheDocument();
  expect(getByText(name)).toBeInTheDocument();
  expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  expect(getByText(type)).toBeInTheDocument();
  expect(getByText('Summary')).toBeInTheDocument();
  expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
  expect(getByText(summary)).toBeInTheDocument();
  const lbl = getByText('Pokémon favoritado?');
  fireEvent.click(lbl);
  const starIcon = getByAltText(`${name} is marked as favorite`);
  const pokIcon = getByAltText(`${name} sprite`);
  expect(pokIcon).toHaveAttribute('src', image);
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  getAllByAltText(`${name} location`).forEach((element, index) => {
    expect(element).toHaveAttribute('src', foundAt[index].map);
  });
});
