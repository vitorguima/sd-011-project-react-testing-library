import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { container } = render(<NotFound />);
    const h2Error = container.querySelector('h2');
    expect(h2Error).toBeInTheDocument();
    expect(h2Error).toHaveTextContent('Page requested not found 😭');
  });
  it('Teste se página mostra a imagem', () => {
    const { container } = render(<NotFound />);
    const errorImage = container.querySelector('img');
    expect(errorImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
