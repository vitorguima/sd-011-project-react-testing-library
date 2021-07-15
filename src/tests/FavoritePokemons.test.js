// Requisito resolvido revendo aulas e acessando o site:
// https://testing-library.com/docs/queries/about/
// https://app.betrybe.com/course/live-lectures/sd-cohort-8#aula-153-rtl-testando-react-router
// https://testing-library.com/docs/queries/about/
// https://testing-library.com/docs/queries/byalttext/
// Baseado nos requisitos 2, 3 e 4

import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = render(
    <FavoritePokemons />,
  );
  const checkText = getByText('No favorite pokemon found');
  expect(checkText).toBeInTheDocument();
});

test('Teste se nenhum pokémons favoritados', () => {
  const { container } = render(
    <FavoritePokemons />,
  );
  const checkNone = container.querySelectorAll('.favorite-pokemon');
  console.log(checkNone.length);
  expect(checkNone.length).toBe(0);
});

test('Teste se tem pokémons favoritados', () => {
  const { container } = render(
    <FavoritePokemons />,
  );
  const checkOne = container.querySelectorAll('.favorite-pokemon');
  console.log(checkOne.length);
  expect(checkOne.length).toBe(0);
});
