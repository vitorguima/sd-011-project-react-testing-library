import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

const locationPikachu = data.map(({ foundAt }) => foundAt)[0]
  .map(({ location }) => location);

const detail = 'More details';

test('Verifica se tem o Summary renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[1];
  expect(getAbout.textContent).toBe('Summary');
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
  console.log(locationPikachu[1]);
  const kanto = 'Kanto Viridian Forest';
  const power = 'Kanto Power Plant';
  expect(getByText(kanto)).toBeInTheDocument();
  expect(getByText(power)).toBeInTheDocument();
});
