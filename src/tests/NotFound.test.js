import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound.js', () => {
  it('testa se página contém "Page requested not found 😭" em h2', () => {
    const { getByRole } = render(<NotFound />);
    const texth2 = getByRole('heading', { level: 2 });
    const title = 'Page requested not found 😭';
    expect(texth2).toBeInTheDocument();
    expect(texth2).toHaveTextContent(title);
  });

  it('testa se página mostra a imagem', () => {
    const { getAllByRole } = render(<NotFound />);
    const img = getAllByRole('img');
    expect(img[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
