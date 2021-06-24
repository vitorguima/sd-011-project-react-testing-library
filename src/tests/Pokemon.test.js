import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('É renderizado um card com as informações de determinado pokémon', () => {
  const {
    getByText,
    getAllByTestId, getByAltText, getByTestId, history } = renderWithRouter(<App />);
  const electricButton = getAllByTestId('pokemon-type-button')[0];
  expect(electricButton).toBeInTheDocument();
  expect(electricButton.innerHTML).toBe('Electric');
  fireEvent.click(electricButton);
  const pikachuName = getByTestId('pokemon-name');
  expect(pikachuName.innerHTML).toBe('Pikachu');
  const pikachuWeight = getByTestId('pokemon-weight');
  expect(pikachuWeight.innerHTML).toBe('Average weight: 6.0 kg');
  const pikachuType = getByTestId('pokemon-type');
  expect(pikachuType.innerHTML).toBe('Electric');
  const pikachuImg = getByAltText('Pikachu sprite');
  expect(pikachuImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const pikachuDetailsPath = history.location.pathname;
  expect(pikachuDetailsPath).toBe('/pokemons/25');
});

test('Existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByText, getByRole, getByAltText, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const input = getByRole('checkbox');
  expect(input).toBeInTheDocument();
  fireEvent.click(input);
  const homeBtn = getByText('Home');
  fireEvent.click(homeBtn);
  const pikachuStar = getByAltText('Pikachu is marked as favorite');
  expect(pikachuStar).toBeInTheDocument();
  expect(pikachuStar.src).toBe('http://localhost/star-icon.svg');
});
