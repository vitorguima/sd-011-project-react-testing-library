import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

const pikachu = data[0];
const { id, name, type, image, averageWeight: { value, measurementUnit } } = pikachu;

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByText, getAllByText, getByRole } = renderWithRouter(<App />);
  expect(getByText(name)).toBeInTheDocument();
  expect(getAllByText(type)[0]).toBeInTheDocument();
  expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  const pokemonImage = getByRole('img', { name: `${name} sprite` });
  expect(pokemonImage).toHaveAttribute('src', image);
  expect(pokemonImage.alt).toContain(`${name} sprite`);
});

test('Teste se o link pokemon funciona', () => {
  const { getByRole } = renderWithRouter(<App />);
  const show = getByRole('link', { name: 'More details' });
  expect(show).toHaveAttribute('href', `/pokemons/${id}`);
});

test('Teste link para a páginda detalhes', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const show = getByRole('link', { name: /More details/i });
  fireEvent.click(show);
  expect(history.location.pathname).toBe(`/pokemons/${id}`);
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const show = getByRole('link', { name: /More details/i });
  fireEvent.click(show);
  const testType = getByTestId(/pokemon-type/i);
  expect(testType.innerHTML).toBe('Electric');
  const check = getByRole('checkbox');
  fireEvent.click(check);
  const favoritePok = getByRole('img', { name: `${name} is marked as favorite` });
  expect(favoritePok).toHaveAttribute('src', '/star-icon.svg');
});
