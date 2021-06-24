import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste componente <App.js />', () => {
  it('É renderizada ao carregar a aplicação no caminho /', () => {
    renderWithRouter(<App />);
    const title = screen.getByText(/Encountered pokémons/);
    expect(title).toBeInTheDocument();
  });

  it('É redirecionada para URL / ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/);
    fireEvent.click(linkHome);

    const url = history.location.pathname;
    expect(url).toBe('/');

    const titlePage = getByText(/Encountered pokémons/);
    expect(titlePage).toBeInTheDocument();
  });

  it('É redirecionada para /about, ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/);
    fireEvent.click(linkAbout);

    const url = history.location.pathname;
    expect(url).toBe('/about');

    const titlePage = getByText(/About Pokédex/);
    expect(titlePage).toBeInTheDocument();
  });

  it('É redirecionada para /favorites, ao clicar no link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorite = getByText(/Favorite Pokémons/);
    fireEvent.click(linkFavorite);

    const url = history.location.pathname;
    expect(url).toBe('/favorites');

    const titlePage = getByText(/Favorite pokémons/);
    expect(titlePage).toBeInTheDocument();
  });

  it('É redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history, container } = renderWithRouter(<App />);
    const routeNotFound = '/contact';
    history.push(routeNotFound);
    expect(container.innerHTML).toMatch(/Page requested not found/);
  });
});
