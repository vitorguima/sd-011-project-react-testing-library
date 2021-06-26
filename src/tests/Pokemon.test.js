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

test('test icon favorite', () => {
  const { container, getByText, getAllByText } = renderWithRouter(<App />);
  const ButtonElectric = getAllByText('Electric')[1];
  fireEvent.click(ButtonElectric);
  const details = getByText(/More Details/i);

  fireEvent.click(details);

  const favorites = container.querySelector('#favorite');
  fireEvent.click(favorites);
  const favoriteIcon = container.querySelector('.favorite-icon');
  expect(favoriteIcon).toBeInTheDocument();
  expect(favoriteIcon.alt).toBe('Pikachu is marked as favorite');
  expect(favoriteIcon.src).toContain('/star-icon.svg');
});
