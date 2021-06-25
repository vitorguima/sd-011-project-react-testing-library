import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByTestId, container } = renderWithRouter(<App />);
  const pokeName = getByTestId('pokemon-name');
  expect(pokeName.textContent).toBe('Pikachu'); // Verifica o nome.
  const pokeType = getByTestId('pokemon-type');
  expect(pokeType.textContent).toBe('Electric'); // Verifica o tipo.
  const pokeAvgWeight = getByTestId('pokemon-weight');
  expect(pokeAvgWeight.textContent).toBe('Average weight: 6.0 kg'); // Verifica o peso.
  const pokeImg = container.querySelector('img');
  expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'); // Verifica o src da img.
  expect(pokeImg).toHaveAttribute('alt', 'Pikachu sprite'); // verifica o alt da img.
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const pokeMoreDetails = getByText('More details');
  fireEvent.click(pokeMoreDetails);
  const pokeFavoriteCheckBox = container.querySelector('#favorite');
  fireEvent.click(pokeFavoriteCheckBox);
  const home = getByText('Home');
  fireEvent.click(home);
  const img = container.querySelectorAll('img');
  expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(img[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
