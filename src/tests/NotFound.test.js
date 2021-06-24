import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testes do componente About.js', () => {
  test(`Testa se página contém um heading h2 
  com o texto Page requested not found 😭`, () => {
    const { getByRole } = render(<NotFound />);
    const notFoundH2 = getByRole('heading', { level: 2 });
    expect(notFoundH2).toHaveTextContent(/Page requested not found 😭/i);
  });
  test('Teste se página mostra a imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const ImgURL = ('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe(ImgURL);
  });
});
