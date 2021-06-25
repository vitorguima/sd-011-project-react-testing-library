import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1', () => {
  it('página principal da Pokédex é renderizada /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Links devem possuir o texto "Home, About, Favorite Pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it(`A aplicação deve ser redirecionada para a página inicial, 
      na URL / ao clicar no link Home da barra de navegação`,
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    fireEvent.click(getByText(/home/i));
    expect(pathname).toBe('/');
  });

  it(`A aplicação deve ser redirecionada para a página de About, na URL /about,
      ao clicar no link About da barra de navegação.`,
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`A aplicação deve ser redirecionada para a página de Pokémons Favoritados, 
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`,
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`A aplicação deve ser redirecionada para a página Not Found
  ao entrar em uma URL desconhecida.`,
  () => {
    const { getByText } = renderWithRouter(<App />, { route: '/not/found' });
    const pageNotFound = getByText(/not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
