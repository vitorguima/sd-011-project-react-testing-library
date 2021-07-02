import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Componente <NotFound/>', () => {
  it('Verifica se a página contém um h2 com o texto "Page requested not found 😭"', () => {
    const { container } = render(<NotFound />);
    const h2 = container.querySelector('h2');

    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Page requested not found 😭');
  });
  it('Verifica se a página contém uma imagem com URL específica', () => {
    const { container } = render(<NotFound />);
    const img = container.querySelector('img');
    const givenURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img.src).toBe(givenURL);
  });
});
