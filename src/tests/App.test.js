import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Se a página principal é renderizada ao carregar no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByText('Pokédex');
    expect(heading).toBeInTheDocument();
  });
  // a
  it('Se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkHome = getByText('Home');
    const linkAbout = getByText('About');
    const linkFavoritePokemons = getByText('Favorite Pokémons');

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Se é redirecionada para a página inicial ao clicar em Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const homeBtn = getByText('Home');
    fireEvent.click(homeBtn);
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });

  it('Se é redirecionada para a página about ao clicar em About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const aboutBtn = getByText('About');
    fireEvent.click(aboutBtn);
    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  it('Se é redirecionada para favorites ao clicar em Favorite pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const favoriteBtn = getByText('Favorite Pokémons');
    fireEvent.click(favoriteBtn);
    const favoritePokemons = getByText('Favorite pokémons');
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('Se é redirecionada para Not Found ao entrar em uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const pageNotFound = getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
