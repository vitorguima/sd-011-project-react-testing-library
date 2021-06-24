import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste componente <NotFound.js />', () => {
  it('Contém um heading h2 com o texto Page requested not found Crying emoji', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const headingText = 'Page requested not found Crying emoji';
    const heading = getByRole('heading', { name: headingText, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const altText = 'Pikachu crying because the page requested was not found';
    const image = getByRole('img', { name: altText });
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toContain(url);
  });
});
