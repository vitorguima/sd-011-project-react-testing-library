import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js />', () => {
  it('Testa se a página principal é renderizada ao carregar no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homePath = history.location.pathname;
    history.push(homePath);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Testa se o topo da aplicação contém um conjunto links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada à página inicial ao clicar no Home.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeButton = getByText('Home');
    fireEvent.click(homeButton);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  it('Testa se a aplicação é redirecionada à página About ao clicar em About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutButton = getByText('About');
    fireEvent.click(aboutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se a aplicação é direcionada à Pokémons Favoritos ao clicar no link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteButton = getByText('Favorite Pokémons');
    fireEvent.click(favoriteButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa redirecionamento à página "Not Found" ao entrar em URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const urlDesconhecida = '/digimons';
    history.push(urlDesconhecida);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
