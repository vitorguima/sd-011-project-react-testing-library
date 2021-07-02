import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando NotFound.js', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { container } = render(<NotFound />);
    const checkH2 = container.querySelector('h2');
    expect(checkH2.textContent).toBe('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = render(<NotFound />);
    const chechImg = getAllByRole('img');
    expect(chechImg[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
