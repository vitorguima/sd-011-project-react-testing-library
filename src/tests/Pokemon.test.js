import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// test('', () => {});
// Consulta em https://testing-library.com/docs/queries/byalttext
it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByText, getByTestId, getByAltText, history } = renderWithRouter(<App />);
  const buttonDragon = getByText(/Dragon/);
  fireEvent.click(buttonDragon);
  const pokeName = getByTestId('pokemon-name');
  expect(pokeName.innerHTML).toBe('Dragonair');
  const pokeType = getByTestId('pokemon-type');
  expect(pokeType.innerHTML).toBe('Dragon');
  const pokeWeight = getByTestId('pokemon-weight');
  expect(pokeWeight.innerHTML).toBe('Average weight: 16.5 kg');
  const pokeImage = getByAltText('Dragonair sprite');
  expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
  const buttonDetail = getByText('More details');
  fireEvent.click(buttonDetail);
  const url = history.location.pathname;
  expect(url).toBe('/pokemons/148');
});

it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, getByRole, getByAltText, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox);
  const buttonHome = getByText('Home');
  fireEvent.click(buttonHome);
  const star = getByAltText('Pikachu is marked as favorite');
  expect(star).toHaveAttribute('src', '/star-icon.svg');
});
