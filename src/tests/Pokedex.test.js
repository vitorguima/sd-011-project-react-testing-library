import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('testando componente pokédex', () => {
  it('testando se há um h2', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/aaa'] }>
        <App />
      </MemoryRouter>,
    );
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent(/Encountered pokémons/i);
  });

  it('testa botão próximo', () => {

  });
});
