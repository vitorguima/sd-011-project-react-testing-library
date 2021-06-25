import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do requisito 4: ', () => {
  it('Se página contém um heading h2 com o texto Page requested not found: ', () => {
    const { getByRole } = render(<NotFound />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Page requested not found 😭');
  });

  it('Se a página mostra a imagem: ', () => {
    const { getByRole } = render(<NotFound />);
    const image = getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    //  precisei colocar o name: (texto do alt) para que reconhecesse a imagem correta.
  });
});
