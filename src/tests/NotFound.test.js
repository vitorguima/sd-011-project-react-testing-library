import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js', () => {
  it('Teste se página contém um heading h2 com determinado texto', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading');
    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  it('Teste se a página mostra a imagem', () => {
    const { getAllByRole } = render(<NotFound />);
    const imgRole = getAllByRole('img');
    expect(imgRole[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
