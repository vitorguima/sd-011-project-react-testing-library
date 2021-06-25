import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Data from '../data';

const moreD = 'More details';

it('Informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { getByText, getAllByRole, container } = renderWithRouter(<App />);

  const moreDetails = getByText(moreD);
  fireEvent.click(moreDetails);

  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(moreDetails).not.toBeInTheDocument();

  const headings = getAllByRole('heading', { level: 2 });
  expect(headings[1].textContent).toBe('Summary');

  const paragraph = container.querySelectorAll('p');
  expect(paragraph[3].textContent).toContain('This intelligent Pokémon roasts hard');
});

it('Seção com os mapas contendo as localizações do pokémon', () => {
  const { getByText, getAllByRole, getAllByAltText } = renderWithRouter(<App />);

  const moreDetails = getByText(moreD);
  fireEvent.click(moreDetails);

  const headings = getAllByRole('heading', { level: 2 });
  expect(headings[2].textContent).toContain('Game Locations of Pikachu');

  Data[0].foundAt.forEach((location, index) => {
    const locationImage = getAllByAltText('Pikachu location');
    const locationName = getByText(location.location);
    expect(locationImage[index].src).toBe(location.map);
    expect(locationName).toBeInTheDocument();
  });
});

it('Favoritar um pokémon através da página de detalhes', () => {
  const { getByLabelText, getByText } = renderWithRouter(<App />);

  const moreDetails = getByText(moreD);
  fireEvent.click(moreDetails);

  const check = getByLabelText('Pokémon favoritado?');
  fireEvent.click(check);

  const favoritePokemons = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemons);

  const pokeName = getByText('Pikachu');
  expect(pokeName).toBeInTheDocument();

  const moreDetail = getByText(moreD);
  fireEvent.click(moreDetail);
  fireEvent.click(check);
  fireEvent.click(favoritePokemons);

  expect(pokeName).not.toBeInTheDocument();
});
