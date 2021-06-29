import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const moreDetailsText = 'More details';

test('verificando se as info detalhadas são exibidas', () => {
  const { getAllByRole, getByText, container } = renderWithRouter(<App />);
  const moreDetails = getByText(moreDetailsText);
  fireEvent.click(moreDetails);
  const nameDetails = getByText('Pikachu Details');
  expect(nameDetails.innerHTML).toBe('Pikachu Details');
  expect(moreDetails).not.toBeInTheDocument();
  const headerTwo = getAllByRole('heading', { level: 2 });
  expect(headerTwo[1]).toBeInTheDocument();
  expect(headerTwo[1].textContent).toBe('Summary');
  const parag = container.querySelectorAll('p');
  expect(parag[3].innerHTML)
    .toBe('This intelligent Pokémon roasts hard berries with '
    + 'electricity to make them tender enough to eat.');
  expect(parag[3]).toBeInTheDocument();
});

it('verificando se contém os mapas de localizações', () => {
  const { getAllByRole, getByText, container } = renderWithRouter(<App />);
  const moreDetails = getByText(moreDetailsText);
  fireEvent.click(moreDetails);
  const headerTwo = getAllByRole('heading', { level: 2 });
  expect(headerTwo[2]).toBeInTheDocument();
  expect(headerTwo[2].innerHTML).toBe('Game Locations of Pikachu');
  const img = container.querySelectorAll('img');
  expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(img[1].alt).toBe('Pikachu location');
  expect(img[1]).toBeInTheDocument();
  expect(img[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(img[2].alt).toBe('Pikachu location');
  expect(img[1]).toBeInTheDocument();
});

it('verifica a possibilidade de favoritar e desfavoritar', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const moreDetails = getByText(moreDetailsText);
  fireEvent.click(moreDetails);
  const labelText = getByText('Pokémon favoritado?');
  expect(labelText.textContent).toBe('Pokémon favoritado?');
  const favorite = container.querySelector('#favorite');
  expect(favorite).toBeInTheDocument();
  fireEvent.click(favorite);
  expect(favorite.checked).toBe(true);
  fireEvent.click(favorite);
  expect(favorite.checked).toBe(false);
});
