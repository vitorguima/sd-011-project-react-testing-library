import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const { name, type, image, averageWeight } = pokemons[0];

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe(name);
  const pokemonType = getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe(type);
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight.innerHTML)
    .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
  const pokemonImage = getByRole('img', { Name: `${pokemonName} sprite` });
  expect(pokemonImage.src).toBe(image);
  expect(pokemonImage.alt).toBe(`${name} sprite`);
});

test('O link deve possuir a URL /pokemons/id, onde id é o id do Pokémon exibido', () => {
  const { getByText } = renderWithRouter(<App />);
  const { id } = pokemons[0];

  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);
  expect(linkDetails.href.endsWith(`/pokemons/${id}`)).toBeTruthy();
});

test('Teste o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
  const { getByText } = renderWithRouter(<App />);
  const { name } = pokemons[0];

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);
  expect(getByText(`${name} Details`)).toBeInTheDocument();
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);

  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);

  const favCheckbox = getByText('Pokémon favoritado?');
  fireEvent.click(favCheckbox);

  const icon = getByAltText('Pikachu is marked as favorite');
  expect(icon).toBeInTheDocument();
  expect(icon.src.endsWith('/star-icon.svg')).toBe(true);
});
