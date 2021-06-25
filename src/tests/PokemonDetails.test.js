import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const caterpieLocation = Data.map(({ foundAt }) => foundAt)[2]
  .map(({ location }) => location);

it('Teste se name details aparece em tela', () => {
  const { getByText } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkMoreDetails = getByText(/More Details/i);
  fireEvent.click(linkMoreDetails);
  const caterpieName = getByText('Caterpie Details');
  expect(caterpieName).toBeInTheDocument();
});

it('Não deve existir o link de navegação para os detalhes do Pokémon', () => {
  const { getByText } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkMoreDetails = getByText(/More Details/i);
  fireEvent.click(linkMoreDetails);
  expect(linkMoreDetails).not.toBeInTheDocument();
});

it('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
  const { getByText, getAllByRole, container } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkMoreDetails = getByText(/More Details/i);
  fireEvent.click(linkMoreDetails);
  const summary = getAllByRole('heading', { level: 2 });
  expect(summary[1].textContent).toBe('Summary');
  const paragraphCaterpie = container.querySelectorAll('p');
  expect(paragraphCaterpie[3].textContent)
    .toBe('For protection, it releases a horrible stench '
    + 'from the antennae on its head to drive away enemies.');
});

it('A seção de detalhes deve conter um heading h2 com o texto Game Locations.', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkMoreDetails = getByText(/More Details/i);
  fireEvent.click(linkMoreDetails);
  const caterpieLocationName = getByText('Game Locations of Caterpie');
  const gamelocations = getAllByRole('heading', { level: 2 });
  expect(caterpieLocationName).toBeInTheDocument();
  expect(gamelocations[2]).toBeInTheDocument();
});

it('Testando imagem de Mapa com src e alt', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkMoreDetails = getByText(/More Details/i);
  fireEvent.click(linkMoreDetails);
  const caterpieLocationImage = container.querySelectorAll('img');
  const altCaterpie = 'Caterpie location';
  expect(caterpieLocationImage[1].src).toBe('https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png');
  expect(caterpieLocationImage[1].alt).toBe(altCaterpie);
  expect(caterpieLocationImage[2].src).toBe('https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png');
  expect(caterpieLocationImage[2].alt).toBe(altCaterpie);
  expect(caterpieLocationImage[3].src).toBe('https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png');
  expect(caterpieLocationImage[3].alt).toBe(altCaterpie);
  expect(caterpieLocationImage[4].src).toBe('https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png');
  expect(caterpieLocationImage[4].alt).toBe(altCaterpie);
  expect(caterpieLocation[0]).toBe('Johto Route 30');
  expect(caterpieLocation[1]).toBe('Johto Route 31');
  expect(caterpieLocation[2]).toBe('Ilex Forest');
  expect(caterpieLocation[3]).toBe('Johto National Park');
});

it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkMoreDetails = getByText(/More Details/i);
  fireEvent.click(linkMoreDetails);
  const textFavorite = getByText('Pokémon favoritado?');
  expect(textFavorite).toBeInTheDocument();
  const inputFavorite = container.querySelector('input');
  expect(inputFavorite).toBeInTheDocument();
  fireEvent.click(inputFavorite);
  expect(inputFavorite.checked).toBeTruthy();
  fireEvent.click(inputFavorite);
  expect(inputFavorite.checked).toBeFalsy();
});
