import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('Verifica requisito 1', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Verifica se o componente app tem link Home', () => {
    renderWithRouter(<App />);
    const titulo = screen.getByText(/Home/i);
    expect(titulo).toBeInTheDocument();
  });

  it('Verifica se o componente app tem link About', () => {
    renderWithRouter(<App />);
    const sobre = screen.getByText(/About/i);
    expect(sobre).toBeInTheDocument();
  });

  it('Verifica se o componente app tem link home', () => {
    renderWithRouter(<App />);
    const favorito = screen.getByText(/Favorite Pokémons/i);
    expect(favorito).toBeInTheDocument();
  });

  it('Deve renderizar a ErrorPage caso seja uma rota não existente', () => {
    const { history, container } = renderWithRouter(<App />);
    const rotaErrada = '/NotFound';
    history.push(rotaErrada);

    expect(container.innerHTML).toMatch(/Not Found/i);
  });
});
