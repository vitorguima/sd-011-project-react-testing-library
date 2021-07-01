import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemons from '../data';

test('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
  const { getAllByRole, queryByText, getByText } = renderWithRouter(<App />);
  const { name, summary } = Pokemons[0];

  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);

  const headings = getAllByRole('heading', { level: 2 });

  expect(headings[0]).toHaveTextContent(`${name} Details`);
  expect(headings[1]).toHaveTextContent('Summary');
  expect(headings[1].nextSibling).toHaveTextContent(summary);
  expect(queryByText(/More details/i)).toBeNull();
});

test('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
  const { getAllByRole, getByText, container } = renderWithRouter(<App />);
  const { name, foundAt } = Pokemons[0];

  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);

  const headings = getAllByRole('heading', { level: 2 });
  expect(headings[2]).toHaveTextContent(`Game Locations of ${name}`);

  const locationPoke = container.querySelector('.pokemon-habitat');
  expect(locationPoke).toBeInTheDocument();
  const divLocation = locationPoke.getElementsByTagName('div');

  const paragraphLocationOne = divLocation[0].querySelector('em').innerHTML;
  const paragraphLocationTwo = divLocation[1].querySelector('em').innerHTML;

  expect(paragraphLocationOne).toBe(foundAt[0].location);
  expect(paragraphLocationTwo).toBe(foundAt[1].location);

  const imageLocationOne = divLocation[0].querySelector('img').src;
  const imageLocationTwo = divLocation[1].querySelector('img').src;

  expect(imageLocationOne).toBe(foundAt[0].map);
  expect(imageLocationTwo).toBe(foundAt[1].map);

  const altImageOne = divLocation[0].querySelector('img').alt;
  const altImageTwo = divLocation[1].querySelector('img').alt;

  expect(altImageOne).toBe(`${name} location`);
  expect(altImageTwo).toBe(`${name} location`);
});

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);

  const checkboxFav = getByRole('checkbox', { name: 'Pokémon favoritado?' });
  expect(checkboxFav).toBeInTheDocument();
});
