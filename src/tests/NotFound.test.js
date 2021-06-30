import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('teste do componente NotFound', () => {
  it('testa se a página contém um h2 com Page requested not found', () => {
    const { getByRole } = render(<NotFound />);

    const getHeading = getByRole('heading',
      { level: 2, name: /Page requested not found/ });
    expect(getHeading).toBeInTheDocument();
  });

  it('testa se a página mostra a imagem', () => {
    const { getByAltText } = render(<NotFound />);

    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
