import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testes no componente Not Found', () => {
  test('Contem h2 com mensagem especifica', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundMessage = getByText(/Page requested not found/);
    expect(notFoundMessage).toBeInTheDocument();
  });
  test('Mostra imagem especifica', () => {
    renderWithRouter(<NotFound />);
    const myImgHtml = document.querySelector('img');
    expect(myImgHtml.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
