import React from 'react';
import { render } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto '
  + 'Page requested not found 😭', () => {
    const { container, getByText } = render(<NotFound />);
    const tagH2 = container.querySelector('h2');
    expect(tagH2).toBeInTheDocument();
    const textH2 = getByText('Page requested not found');
    expect(textH2).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem do Pikachu', () => {
    const { container } = render(<NotFound />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
