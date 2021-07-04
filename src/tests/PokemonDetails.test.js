import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se as infos detalhadas do Pokémon selecionado são mostradas', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const pokeDetails = getByText(/More details/);
  fireEvent.click(pokeDetails);
  const pokeName = getByText(/Pikachu Details/);
  expect(pokeName).toBeInTheDocument();
  const pokeSummary = getByText(/Summary/);
  expect(pokeSummary).toBeInTheDocument();
  const pokeHeading = container.querySelector('p');
  expect(pokeHeading).toBeInTheDocument();
});

test('Se existe uma seção com o mapa', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const pokeDetails = getByText(/More details/);
  fireEvent.click(pokeDetails);
  const locHeading = getByText(/Game Locations of Pikachu/);
  expect(locHeading).toBeInTheDocument();
  const mapLocation = container.querySelectorAll('.pokemon-habitat img');
  console.log(mapLocation);
  expect(mapLocation.length).toBe(2);
  const mapDiv = container.querySelectorAll('em');
  expect(mapDiv.length).toEqual(mapLocation.length);
});
