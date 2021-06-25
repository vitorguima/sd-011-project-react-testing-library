import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);
  const { image, name, type, averageWeight } = data[0];
  const { measurementUnit, value } = averageWeight;

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe(name);
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe(type);
  expect(pokemonType).toBeInTheDocument();

  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
  expect(pokemonWeight).toBeInTheDocument();

  const pokemonImg = getByAltText('Pikachu sprite');
  expect(pokemonImg.src).toBe(image);
  expect(pokemonImg).toBeInTheDocument();
});

const moreDetailsText = 'More details';

it('verificar se o card do pokémon contem link de "More details"', () => {
  const { getByText } = renderWithRouter(<App />);
  const { id } = data[0];
  const moreDetails = getByText(moreDetailsText);

  expect(moreDetails).toBeInTheDocument();
  expect(moreDetails.href).toContain(`/pokemons/${id}`);
});

it('verifica se a URL é alterada de acordo com o id do pokémon', () => {
  const { getByText } = renderWithRouter(<App />);
  const { id } = data[0];
  const moreDetails = getByText(moreDetailsText);

  fireEvent.click(moreDetails);

  expect(moreDetails.href).toContain(`/pokemons/${id}`);
});

it('verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const moreDetails = getByText(moreDetailsText);
  fireEvent.click(moreDetails);
  const favorite = container.querySelector('#favorite');
  fireEvent.click(favorite);
  const linkFavorite = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavorite);
  const favorites = getByText('Pikachu');
  expect(favorites).toBeInTheDocument();
  const star = container.querySelectorAll('img');
  expect(star[1].src).toContain('/star-icon.svg');
  expect(star[1].alt).toBe('Pikachu is marked as favorite');
});
