import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const caterpie = Data[2];
  const { value, measurementUnit } = caterpie.averageWeight;
  const { getByText, container } = renderWithRouter(
    <Pokemon pokemon={ caterpie } />,
  );
  const caterpieImage = container.querySelector('img');
  console.log(caterpieImage.scr);
  expect(getByText(caterpie.name)).toBeInTheDocument();
  expect(getByText(caterpie.type)).toBeInTheDocument();
  expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  expect(caterpieImage.src).toBe('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
  expect(caterpieImage.alt).toBe('Caterpie sprite');
});

it('Teste na Pokédex contém um link para exibir detalhes deste Pokémon', () => {
  const caterpie = Data[2];
  const { getByText, history } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkDetails = getByText(/More Details/i);
  fireEvent.click(linkDetails);
  const url = history.location.pathname;
  expect(url).toBe(`/pokemons/${caterpie.id}`);
});

it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, container, getByAltText } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkMoreDetails = getByText(/More Details/i);
  fireEvent.click(linkMoreDetails);
  const labelFavoritePokemon = container.querySelector('#favorite');
  fireEvent.click(labelFavoritePokemon);
  const starIcon = getByAltText('Caterpie is marked as favorite');
  expect(starIcon).toBeInTheDocument();
  expect(starIcon.src).toContain('/star-icon.svg');
});
