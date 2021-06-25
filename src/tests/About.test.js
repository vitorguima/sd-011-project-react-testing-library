import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../Renderwithrouter';
import About from '../components/About';
import App from '../App';

describe('Teste do about.js', () => {
  it('Testa se a página contém informações sobre a Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
  });

  it('Verifica se a página contém h2 com About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading.innerHTML).toBe('About Pokédex');
  });

  it('Verifica se existem dois parágrafos na página About', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');

    expect(paragraphs.length).toEqual(2);
  });

  it('Verifica se contém uma img na página', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
