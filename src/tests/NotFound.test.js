// Requisito resolvido revendo aulas e acessando o site:
// https://testing-library.com/docs/queries/about/
// https://app.betrybe.com/course/live-lectures/sd-cohort-8#aula-153-rtl-testando-react-router
// https://testing-library.com/docs/queries/about/
// https://testing-library.com/docs/queries/byalttext/
// Baseado no requisito 2

import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Testa se a pág contém um heading h2 com o texto Page requested not found', () => {
  const { container } = render(
    <NotFound />,
  );
  const checkHead = container.querySelector('h2');
  expect(checkHead).toHaveTextContent('Page requested not found');
});

test('Testa se a página mostra a imagem', () => {
  const { getByAltText } = render(
    <NotFound />,
  );
  const verImg = getByAltText('Pikachu crying because the page requested was not found');
  expect(verImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
