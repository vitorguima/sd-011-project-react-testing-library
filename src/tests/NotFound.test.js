import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste do componente Not Found', () => {
  it('Teste se page contém um heading h2 com o texto Page requested not found 😭"', () => {
    // Acessar os elementos da tela
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    const titleText = 'Page requested not found';
    // Fazer os testes
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    // Acessar os elementos da tela
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText(/pikachu/i);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    // Fazer os testes
    expect(img.src).toMatch(url);
  });
});
