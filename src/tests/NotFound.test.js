import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  it('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = render(<NotFound />);
    const home = getByText(/Page requested not found/);
    expect(home).toBeInTheDocument();
  });
  it('se página mostra uma imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
