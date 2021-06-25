import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('A pagina um subtitulo com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const headingPage = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(headingPage).toBeInTheDocument();
  });

  it('a página renderiza uma imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
