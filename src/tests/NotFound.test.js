import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

const msg = 'Page requested not found 😭';
const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se página contém um heading h2 com o texto ${msg}`, () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading');
    expect(h2.textContent).toBe(msg);
  });
  it(`Teste se página mostra a imagem ${imageLink}`, () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1].src).toBe(imageLink);
  });
});
