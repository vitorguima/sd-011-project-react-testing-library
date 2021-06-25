import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { Pokemon } from '../components';
import data from '../data';
import renderWithRouter from '../RenderWithRouter';

const pokemon = data[0];
const { name, type, averageWeight: { value, measurementUnit }, image, id } = pokemon;

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByText, container } = renderWithRouter(
    <Pokemon pokemon={ pokemon } showDetailsLink={ false } isFavorite={ false } />,
  );
  expect(getByText(name)).toBeInTheDocument();
  expect(getByText(type)).toBeInTheDocument();
  expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  const img = container.querySelectorAll('img')[0];
  expect(img.src).toBe(image);
  expect(img.alt).toBe(`${name} sprite`);
});

test('Teste se o card do Pokémon na Pokédex contém um link para exibir detalhes', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon pokemon={ pokemon } showDetailsLink isFavorite={ false } />,
  );
  const link = getByText('More details');
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  const url = history.location.pathname;
  expect(url).toBe(`/pokemons/${id}`);
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { container } = renderWithRouter(
    <Pokemon pokemon={ pokemon } showDetailsLink={ false } isFavorite />,
  );
  const img = container.querySelectorAll('img')[1];
  expect(img.src).toBe('http://localhost/star-icon.svg');
  expect(img.alt).toBe(`${name} is marked as favorite`);
});
