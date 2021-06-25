import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente App', () => {
  it('verifica se renderiza o texto `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se a página Pokédex renderiza ao carregar url "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se possui o link de navegação Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/);
    fireEvent.click(home);
  });

  it('Verifica se possui o link de navegação About', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/);
    fireEvent.click(about);
  });

  it('Verifica se possui o link de navegação Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/);
    fireEvent.click(favorite);
  });

  it('Verifica se um caminho não existente é renderezado para pagina Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const pageNotFound = getByText(/Page requested/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
