import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes componente App.js', () => {
  it('testa se a página inicial é renderizada ao carregar "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const title = getByText(/Encountered Pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favoritePokemons = getByText(/favorite pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('testa se a aplicação é direcionada para "/" ao clicar em Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/home/i);

    fireEvent.click(home);
    const urlHome = history.location.pathname;
    expect(urlHome).toBe('/');
  });

  it('testa se a aplicação é direcionada para "/about" ao clicar em About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/about/i);

    fireEvent.click(about);
    const urlAbout = history.location.pathname;
    expect(urlAbout).toBe('/about');
  });

  it('testa se é direcionada para "/favorites" ao clicar em Pokémons Favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/favorite pokémons/i);

    fireEvent.click(favoritePokemons);
    const urlfavorite = history.location.pathname;
    expect(urlfavorite).toBe('/favorites');
  });

  it('testa se é direcionada para Not Found ao entrar em uma URL desconhnecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
