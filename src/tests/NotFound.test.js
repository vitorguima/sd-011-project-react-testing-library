import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes relativos ao componente NotFound', () => {
  test('Testa se a página contém um h2 com o texto de NotFound', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/xablau'] }>
        <NotFound />
      </MemoryRouter>,
    );
    const h2 = 'Page requested not found';
    expect(getByText(h2)).toBeInTheDocument();
  });
  it('Testa se a página contém a imagem', () => {
    render(
      <MemoryRouter initialEntries={ ['/xablau'] }>
        <NotFound />
      </MemoryRouter>,
    );
    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
