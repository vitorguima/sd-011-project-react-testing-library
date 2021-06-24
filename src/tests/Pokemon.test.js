import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const pokemonNameId = 'pokemon-name';

it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByTestId, container } = renderWithRouter(<App />);
  const pokemonName = getByTestId(pokemonNameId);
  const pokemonType = getByTestId('pokemon-type');
  const averageWeight = getByTestId('pokemon-weight');
  const pokemonImage = container.querySelector('img');

  expect(pokemonName).toHaveTextContent(data[0].name);
  expect(pokemonType).toHaveTextContent(data[0].type);
  expect(averageWeight)
    .toHaveTextContent(`Average weight: ${data[0]
      .averageWeight.value} ${data[0].averageWeight.measurementUnit}`);
  expect(pokemonImage).toHaveAttribute('src', data[0].image);
});

it('Teste se o card...', () => {
  const { container } = renderWithRouter(<App />);
  const detailsLink = container.querySelectorAll('a');

  expect(detailsLink[3]).toHaveAttribute('href', `/pokemons/${data[0].id}`);
});

it('Teste se o clique leva a URL do id do pokemon', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const moreDetails = getByText(/More Details/i);
  fireEvent.click(moreDetails);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${data[0].id}`);
});

it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const moreDetails = getByText(/More Details/i);
  fireEvent.click(moreDetails);

  const favoriteButton = getByText(/Pokémon favoritado?/i);
  fireEvent.click(favoriteButton);

  const images = container.querySelectorAll('img');
  expect(images[0]).toHaveAttribute('src', `${data[0].image}`);
  expect(images[0]).toHaveAttribute('alt', `${data[0].name} sprite`);
  expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(images[1]).toHaveAttribute('alt', `${data[0].name} is marked as favorite`);
});
