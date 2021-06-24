import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import { render } from 'react-dom';

describe('Testa o componente App.js', () => {
  test('Testa ser a rota da página "Home" é "/" ao terminar o carregamento', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação tem os links "Home", "About" e "Favorites Pokémons"', () => {
    /** Para fazer uso do container, foi consultado um tópico em StackOverFlow, que fala
     * justamente sobre "container" e como pode-se encontrar o elemento que bem entender.
     * Fonte: https://stackoverflow.com/questions/54234515/get-by-html-element-with-react-testing-library */
    const { container } = renderWithRouter(<App />);

    /** Verificação se existe um nav com itens específicos */
    const home = container.querySelector('nav').firstChild;
    const about = container.querySelector('nav').firstChild.nextSibling;
    const favorites = container.querySelector('nav').lastChild;

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it('Teste se ao clicar em "Home" direciona para "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/home/i);
    fireEvent.click(homeLink);
    const pathWay = history.location.pathname;
    expect(pathWay).toBe('/');
  });

  it('Teste se ao clicar em "About" direciona para "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/about/i);
    fireEvent.click(aboutLink);
    const pathWay = history.location.pathname;
    expect(pathWay).toBe('/about');
  });

  it('Teste se ao clicar em "Favorite Pokémons" direciona para "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritesLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);
    const pathWay = history.location.pathname;
    expect(pathWay).toBe('/favorites');
  });

  it('Teste se ao digitar URL inexistente, redireciona para página "NotFound"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xableison');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
