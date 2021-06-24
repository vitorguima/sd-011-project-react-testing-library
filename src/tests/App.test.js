import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente App', () => {
  it('Verifica se a página inicialmente carregada é "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica os links de navegação da página inicial', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
    expect(getByText('Favorite Pokémons')).toBeTruthy();
  });

  it('Verifica se a apliação é redicionada para / ao clicar em Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se a apliação é redicionada para /about ao clicar em About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Aplicação é redirecionado para /favorites ao clicar em Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemonsLink = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemonsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Componente notFound é renderizado ao entrar em uma URL desconhecida', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/xablau');
    const { pathname } = history.location;
    expect(pathname).toBe('/xablau');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
