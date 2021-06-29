import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1 - Teste o componente <App/>', () => {
  it('Testa se a Home é renderizada na URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const text = getByText(/Encountered pokémons/);
    expect(text).toBeInTheDocument();
  });

  it('Renderiza o link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/Home/);
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });

  it('Renderiza o link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/About/);
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/about');
    const text = getByText(/About Pokédex/);
    expect(text).toBeInTheDocument();
  });

  it('Renderiza o link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/Favorite Pokémons/);
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/favorites');
    const text = getByText(/Favorite pokémons/);
    expect(text).toBeInTheDocument();
  });

  it('Rota não existente renderiza Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/);
    expect(noMatch).toBeInTheDocument();
  });
});
