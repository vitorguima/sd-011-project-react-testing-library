import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading');
    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem', () => {
    const { container } = render(<NotFound />);
    const image = container.querySelector('.not-found-image');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
