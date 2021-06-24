import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <NotFound.js />', () => {
  it('Verifica o h2 e a imagem do componente NotFound', () => {
    const { container } = renderWithRouter(<NotFound />);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const h2Title = container.querySelector('h2');
    const img = container.querySelector('img');
    expect(h2Title.textContent).toBe('Page requested not found 😭');
    expect(img.src).toBe(imgURL);
  });
});
