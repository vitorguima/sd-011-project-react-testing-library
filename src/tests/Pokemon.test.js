import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';
import App from '../App';
import Pokemon from '../components/Pokemon';

test('teste se é renderizado as informações no card Pokemon', () => {
  const pikachu = Data[0];
  const { value, measurementUnit } = pikachu.averageWeight;
  const { getByText, container } = renderWithRouter(
    <Pokemon pokemon={ pikachu } isFavorite={ false } />,
  );
  expect(getByText(pikachu.name)).toBeInTheDocument();
  expect(getByText(pikachu.type)).toBeInTheDocument();
  expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();

  const imgPokemon = container.querySelector('img');
  console.log(imgPokemon.src);
  expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(imgPokemon.alt).toBe('Pikachu sprite');
});

test('Teste de caminho de url de Pokemons More Details', () => {
  const pikachu = Data[0];
  const { getAllByText, getByText, history } = renderWithRouter(<App />);
  const ButtonElectric = getAllByText('Electric')[1];
  fireEvent.click(ButtonElectric);

  const details = getByText(/More Details/i);
  fireEvent.click(details);

  const historyUrl = history.location.pathname;
  expect(historyUrl).toBe(`/pokemons/${pikachu.id}`);
});


