import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste do componente NotFound.js', () => {
  test('Verifica se contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    const titleText = 'Page requested not found 😭';
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
  });
  test('Teste se a página contém a seguinte imagem em descrição', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText(/pikachu/i);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img.src).toMatch(url);
  });
});
