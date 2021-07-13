import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

it('Verifica se o card com as informacoes é renderizado', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.textContent).toBe('Pikachu');

  const pokemonType = getByTestId('pokemon-type');
  expect(pokemonType.textContent).toBe('Electric');

  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');

  const img = getByAltText('Pikachu sprite');
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

it('Verifica se possui um link de navegação', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const details = getByText(/More details/);
  expect(details).toBeInTheDocument();
  fireEvent.click(details);

  const url = history.location.pathname;
  expect(url).toBe('/pokemons/25');
});

it('Verifica e existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByAltText, getByText } = renderWithRouter(<App />);

  const details = getByText(/More details/);
  fireEvent.click(details);

  const favPokemon = getByText(/Pokémon favoritado/);
  fireEvent.click(favPokemon);

  const favImg = getByAltText('Pikachu is marked as favorite');
  expect(favImg.src).toBe('http://localhost/star-icon.svg');
});
