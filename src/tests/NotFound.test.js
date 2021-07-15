import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('testando componente not found', () => {
  it('testando se há um h2', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/aaa'] }>
        <App />
      </MemoryRouter>,
    );
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent(/Page requested not found/i);
  });

  it('testa se há a imagem', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/aaa'] }>
        <App />
      </MemoryRouter>,
    );
    const image = getAllByRole('img')[1];
    const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toContain(source);
  });
});
