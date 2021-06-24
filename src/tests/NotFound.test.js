import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText, getByRole } = render(<NotFound />);

    const heading = getByRole(/heading/);
    const headingNotFound = getByText(/Page requested not found/);
    expect(headingNotFound).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText(/Pikachu crying because the page requested was not found/);
    expect(image.src).toContain(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
