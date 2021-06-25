import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

it('Teste se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);

  const pokemonName = getByText(`${data[0].name} Details`);
  expect(pokemonName).toBeInTheDocument();

  const h2 = container.querySelectorAll('h2');
  expect(h2[1]).toHaveTextContent('Summary');

  const pokemonSummary = getByText(`${data[0].summary}`);
  expect(pokemonSummary).toBeInTheDocument();
});

it('Teste se existe na página uma seção com os mapas contendo as localizações', () => {
  const { getByText, getAllByAltText } = renderWithRouter(<App />);
  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);
  expect(getByText(`Game Locations of ${data[0].name}`)).toBeInTheDocument();

  const locationImagesAlt = getAllByAltText(`${data[0].name} location`);
  expect(locationImagesAlt).toHaveLength(data[0].foundAt.length);
  expect(locationImagesAlt[1]).toHaveAttribute('src', data[0].foundAt[1].map);
});

it('Teste se o usuário pode favoritar um pokémon.', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);

  const favoriteButton = getByText(/Pokémon favoritado?/i);
  expect(favoriteButton).toBeInTheDocument();
  fireEvent.click(favoriteButton);

  const goToFavorite = getByText(/Favorite Pokémons/i);
  fireEvent.click(goToFavorite);

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
});
