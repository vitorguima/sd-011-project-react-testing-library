import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading com o texto Page requested not found 😭', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFound />);

    expect(getByRole('heading')).toBeInTheDocument();
    expect(getByText('Page requested not found')).toBeInTheDocument();
    expect(getByText('😭')).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { container } = renderWithRouter(<NotFound />);
    const image = container.querySelector('.not-found-image');

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
