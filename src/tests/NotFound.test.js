import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testa componente notFound', () => {
  test('Teste se página contém um heading h2', () => {
    const { getByRole } = render(<NotFound />);
    const head = getByRole('heading');
    expect(head).toBeInTheDocument();
    expect(head.textContent).toBe('Page requested not found 😭');
  });
  test('Testa a imagem gif ', () => {
    const { container } = render(<NotFound />);
    const ImgPoke = container.querySelector('img').src;
    expect(ImgPoke).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
