import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

it('Verifica os detalhes do pokemon selecionado', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const pokemonName = getByTestId('pokemon-name').innerHTML;

  const details = getByText(/More details/);
  fireEvent.click(details);

  const textDetails = getByText(`${pokemonName} Details`);
  expect(textDetails).toBeInTheDocument();

  expect(details).not.toBeInTheDocument();

  const summary = getByText('Summary');
  expect(summary).toBeInTheDocument();

  const paragraph = getByText(/This intelligent Pokémon/i);
  expect(paragraph).toBeInTheDocument();
});

it('Verifica se existe mapas na pagina', () => {
  const { getByText,
    getByTestId,
    container,
    getAllByAltText,
  } = renderWithRouter(<App />);

  const pokemonName = getByTestId('pokemon-name').innerHTML;

  const details = getByText(/More details/);
  fireEvent.click(details);

  const maps = getByText(`Game Locations of ${pokemonName}`);
  expect(maps).toBeInTheDocument();

  const allMaps = container.querySelector('.pokemon-habitat').children.length;
  expect(allMaps).toBe(2);

  const mapOne = getByText(/Kanto Viridian Forest/);
  const mapTwo = getByText(/Kanto Power Plant/);
  expect(mapOne).toBeInTheDocument();
  expect(mapTwo).toBeInTheDocument();

  const mapImg = getAllByAltText('Pikachu location');
  expect(mapImg[0]).toBeInTheDocument();
  expect(mapImg[1]).toBeInTheDocument();

  const mapOneUrl = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
  const mapTwoUrl = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

  expect(mapImg[0].src).toBe(mapOneUrl);
  expect(mapImg[1].src).toBe(mapTwoUrl);
});

it('Verifica se pode favoritar os pokemons', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);

  const details = getByText(/More details/);
  fireEvent.click(details);

  const favPokemon = getByText(/Pokémon favoritado/);
  fireEvent.click(favPokemon);

  const marked = getByAltText('Pikachu is marked as favorite');
  expect(marked).toBeInTheDocument();

  fireEvent.click(favPokemon);
  expect(marked).not.toBeInTheDocument();
});
