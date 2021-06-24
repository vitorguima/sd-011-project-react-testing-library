import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('Página principal da Pokédex é renderizada no caminho de URL /', () => {
  const { getByText } = renderWithRouter(<App />);
  const title = getByText(/Pokédex/i);
  expect(title).toBeInTheDocument();
});

it('Topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const appNavLinks = getByRole('navigation');
  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  const favoritePokemons = getByText(/Favorite Pokémons/i);
  expect(appNavLinks.children[0]).toBe(home);
  expect(appNavLinks.children[1]).toBe(about);
  expect(appNavLinks.children[2]).toBe(favoritePokemons);
});

it('Aplicação é redirecionada para a página inicial ao clicar em Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const homeLink = getByText(/Home/i);
  fireEvent.click(homeLink);
  const { pathname } = history.location.pathname;
  expect(pathname).toBe('/');
});

it('Aplicação é redirecionada para a página de About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const aboutLink = getByText(/About/i);
  fireEvent.click(aboutLink);
  const { pathname } = history.location.pathname;
  expect(pathname).toBe('/about');
});

it('Aplicação é redirecionada para a página de Pokémons Favoritados.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favoriteLink = getByText(/Favorite Pokémons/i);
  fireEvent.click(favoriteLink);
  const { pathname } = history.location.pathname;
  expect(pathname).toBe('/favorites');
});

it('Aplicação é redirecionada para a página Not Found.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
