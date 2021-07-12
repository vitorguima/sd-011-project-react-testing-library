import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renderizar card', () => {
  const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
  fireEvent.click(getByText(/bug/i));
  const name = getByText('Caterpie');
  const peso = getByText('Average weight: 2.9 kg');
  const type = getByTestId('pokemon-type');
  const imagem = getByRole('img');
  expect(name).toBeInTheDocument();
  expect(peso).toBeInTheDocument();
  expect(type.innerHTML).toBe('Bug');
  expect(imagem.src).toContain('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
  expect(imagem.alt).toContain('Caterpie sprite');
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
  expect(imgFavorite.alt).toContain('Pikachu is marked as favorite');
});
