import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Verifica se a primeira página carregada é a URL /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
    expect(getByText('Favorite Pokémons')).toBeTruthy();
  });

  it('Verifica se ao Clicar em Home redireciona para / ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se ao Clicar em About redireciona para /About ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se ao Clicar em Favorite redireciona para /Favorite', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se inserir uma URL errada redireciona para notFound', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/erro');
    const { pathname } = history.location;
    expect(pathname).toBe('/erro');
    expect(getByText(/Page requested not found/i));
  });
});
