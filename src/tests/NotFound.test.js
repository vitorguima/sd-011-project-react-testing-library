import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      render(<NotFound />);

      const heading = screen.getByRole('heading', {
        name: /page requested not found/i,
        level: 2,
      });
      expect(heading).toBeInTheDocument();
    });
  it('Teste se a página tem essa imagem: ', () => {
    render(<NotFound />);

    const img = screen.queryByRole('img', {
      name: /pikachu crying /i,
    });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
