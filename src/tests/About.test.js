import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
// import About from '../components/About';

describe('testando componente about', () => {
  it('testa se about tem informações', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );

    const info = getByText(/This application simulates/i);
    expect(info).toBeInTheDocument();
  });

  it('testa se existe o h2 "About Pokédex"', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent(/About Pokédex/i);
  });

  it('testa se existem 2 parágrafos', () => {
    const { container } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const parag = container.querySelectorAll('p');
    expect(parag.length).toBe(2);
  });

  it('testa se há a imagem', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const image = getByRole('img');
    const source = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toContain(source);
  });
});
