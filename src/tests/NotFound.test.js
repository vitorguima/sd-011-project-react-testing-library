
import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste do componente NotFound', () => {
  test('Testa se a pagina contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const headingH2 = getByRole('heading', { level: 2 });
    expect(headingH2).toHaveTextContent('Page requested not found');
  });

  test('Testa se a pagina mostra a imagem', () => {
    render(<NotFound />);
    const img = document.querySelector('img');
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
