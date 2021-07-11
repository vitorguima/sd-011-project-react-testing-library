import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se é renderizado um card pokemon-name', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const test = getByTestId('pokemon-name');
  // console.log(test.innerHTML);
  expect(test.innerHTML).toBe('Pikachu');
});

test('Teste se é renderizado um card pokemontype', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const test = getByTestId('pokemon-type');
  expect(test.innerHTML).toBe('Electric');
});

test('Teste se é renderizado um card- weight ', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const test = getByTestId('pokemon-weight');
  expect(test.innerHTML).toBe('Average weight: 6.0 kg');
});

test('testa se aparece a imagem', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  const alt = 'Pikachu sprite';
  const imagem = getAllByRole('img');
  expect(imagem[0].src).toContain(img);
  expect(imagem[0].alt).toContain(alt);
});

test('test link', () => {
  const { getByRole, history, container } = renderWithRouter(<App />);
  const link = '/pokemons/25';
  const ancora = getByRole('link', { name: /More details/i });
  // console.log(ancora);
  // testa se o atributo href de 'mais detalhes' é igual a link
  expect(ancora.href).toContain(link);
  // clica no ancora, que é o mais detalhes
  fireEvent.click(ancora);
  // vai testar se esta na url /pokemons/25
  expect(history.location.pathname).toBe(link);
  // depois estar na pagina detalhes do pokemon
  // achar a caixa de seleçao e click
  const box = getByRole('checkbox', { id: /favorite/i });
  // console.log(box);
  fireEvent.click(box);
  // testar se esta true a caixa
  expect(box.checked).toBe(true);
  /* const imgStar = getByRole('img',{ name: /favorite icon/i })
  console.log(imgStar); */
  // pegar imagemk com container.querySelectorAll
  const imgFavorite = container.querySelector('.favorite-icon');
  // console.log(imgFavorite);
  const url = '/star-icon.svg';
  expect(imgFavorite.src).toContain(url);
});
