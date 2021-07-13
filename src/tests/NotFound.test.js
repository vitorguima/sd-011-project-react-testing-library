import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um h2 com o texto Page requested not found 😭', () => {
    const { getByText } = render(<NotFound />);
    const header = getByText(/Page requested not found/i);
    expect(header).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const textNotFound = getByAltText(/Pikachu crying because/i);
    expect(textNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
