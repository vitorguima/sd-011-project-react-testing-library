import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1', () => {
  it(`Teste se página contém um heading h2 com o texto 
  "Page requested not found 😭"`,
  () => {
    const { getByText } = renderWithRouter(<App />, { route: '/not/found' });
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  it(`Teste se página mostra a 
  imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.`,
  () => {
    const { container } = renderWithRouter(<App />, { route: '/not/found' });
    const image = container.querySelector('img');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
