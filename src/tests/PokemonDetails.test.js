import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const detail = 'More details';
const getPar = Data.map((sum) => sum.summary)[0];

test('Verifica se tem o Summary renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[1];
  expect(getAbout.textContent).toBe('Summary');
});

test('Verifica se tem o paragrafor é renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getP = container.querySelectorAll('p')[3];
  expect(getP.textContent).toBe(getPar);
});

test('Verifica se tem "Pokemon favorito?" e renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getFavorite = container.querySelector('label');
  // console.log(getAbout.textContent);

  expect(getFavorite.textContent).toBe('Pokémon favoritado?');
});

test('Verifica se tem o Game Locations of<Name> renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[2];
  expect(getAbout.textContent).toBe('Game Locations of Pikachu');
});

test('Verifica se tem o Pikachu Details renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[0];
  expect(getAbout.textContent).toBe('Pikachu Details');
});

test('Verifica se details não é renderizado no pagina details', () => {
  const { getByText } = renderWithRouter(<App />);
  const details = getByText('More details');
  fireEvent.click(details);
  expect(details).not.toBeInTheDocument();
});

test('testando a locarização pokemon', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const imgPokemon = container.querySelectorAll('img');
  // console.log(imgPokemon[2]);
  const altP = 'Pikachu location';
  expect(imgPokemon[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgPokemon[1].alt).toBe(altP);
  expect(imgPokemon[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(imgPokemon[2].alt).toBe(altP);
  // console.log(locationPikachu[1]);
  const kanto = 'Kanto Viridian Forest';
  const power = 'Kanto Power Plant';
  expect(getByText(kanto)).toBeInTheDocument();
  expect(getByText(power)).toBeInTheDocument();
});
