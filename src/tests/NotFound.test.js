import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const { getByRole } = render(<NotFound />);
      const h2 = getByRole('heading', { level: 2, name: /Page requested not found/ });
      expect(h2).toBeInTheDocument();
    });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      const { getByAltText } = render(<NotFound />);
      const img = getByAltText(/Pikachu crying because the page requested was not found/);
      const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
      expect(img.src).toBe(imgUrl);
    });
});
