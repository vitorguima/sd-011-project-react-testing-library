import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);
  const bugButton = getAllByTestId('pokemon-type-button')[2];
  expect(bugButton).toBeInTheDocument();
  expect(bugButton.innerHTML).toBe('Bug');
  fireEvent.click(bugButton);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const caterpieDetails = getByText('Caterpie Details');
  expect(caterpieDetails).toBeInTheDocument();
  const summary = getByText('Summary');
  expect(summary).toBeInTheDocument();
  const caterpieSummary = pokemons[2].summary;
  const caterpieSummaryElement = getByText(caterpieSummary);
  expect(caterpieSummaryElement).toBeInTheDocument();
});

test('Existe na página uma seção com os mapas das localizações do pokémon', () => {
  const { getByText, getAllByAltText, history } = renderWithRouter(<App />);
  history.push('/pokemons/10');
  const caterpieLocations = getByText('Game Locations of Caterpie');
  expect(caterpieLocations).toBeInTheDocument();
  const caterpieMaps = getAllByAltText('Caterpie location');
  const totalCaterpieLocations = 4;
  expect(caterpieMaps.length).toBe(totalCaterpieLocations);
  expect(caterpieMaps[0].src).toBe('https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png');
});

test('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
  const { getByRole, getByLabelText, getByAltText, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const favCheckbox = getByRole('checkbox');
  expect(favCheckbox).toBeInTheDocument();
  const favLabel = getByLabelText('Pokémon favoritado?');
  expect(favLabel).toBeInTheDocument();
  fireEvent.click(favLabel);
  history.push('/');
  const pikachuStar = getByAltText('Pikachu is marked as favorite');
  expect(pikachuStar).toBeInTheDocument();
  history.push('/pokemons/25');
  fireEvent.click(favLabel);
  expect(pikachuStar).not.toBeInTheDocument();
});
