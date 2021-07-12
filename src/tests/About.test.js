// Requisito resolvido revendo aulas e acessando o site:
// https://testing-library.com/docs/queries/about/
// https://app.betrybe.com/course/live-lectures/sd-cohort-8#aula-153-rtl-testando-react-router
// https://testing-library.com/docs/queries/about/
// https://testing-library.com/docs/queries/byalttext/

import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Testa se a página contém informações sobre a Pokédex', () => {
  const { container } = render(
    <About />,
  );
  expect(container.querySelector('.pokedex-image')).toBeInTheDocument();
});

test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
  const { container } = render(
    <About />,
  );
  const checkHead = container.querySelector('h2');
  expect(checkHead).toHaveTextContent('About Pokédex');
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(
    <About />,
  );
  const checkLine = container.querySelectorAll('p');
  expect(checkLine.length === 2).toBe(true);
});

test('Testa se a página contém a imagem de uma Pokédex', () => {
  const { getByAltText } = render(
    <About />,
  );
  const checkImage = getByAltText('Pokédex');
  expect(checkImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
