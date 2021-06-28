import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import About from '../components/About';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './RenderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('Testa se renderiza a rota "/"', () => {
  renderWithRouter(<App />);

  const mainText = screen.getByText(/Encountered pokémons/i);
  expect(mainText).toBeInTheDocument();
});

it('Testa os links do topo', () => {
  renderWithRouter(<App />);

  const firstLink = screen.getByText(/Home/i);
  expect(firstLink).toBeInTheDocument();

  const secondLink = screen.getByText(/About/i);
  expect(secondLink).toBeInTheDocument();

  const thirdLink = screen.getByText(/Favorite Pokémons/i);
  expect(thirdLink).toBeInTheDocument();
});

it('Testa o redirecionamento na url "/" ao clicar em "Home"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/);
  fireEvent.click(linkHome);
  const url = history.location.pathname;
  expect(url).toBe('/');
});

it('Testa se redireciona para a página de "About", na URL "/about"', () => {
  const { getByText, history } = renderWithRouter(<About />);
  const linkAbout = getByText(/About/i);
  fireEvent.click(linkAbout);

  const urlAbout = history.location.pathname;
  expect(urlAbout).toBe('/about');

  const aboutPage = getByText(/About Pokédex/);
  expect(aboutPage).toBeInTheDocument();
});

it('Teste se redireciona página de `Pokémons Favoritados`, na URL `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<FavoritePokemons />);
  const linkFavorites = getByText(/Favorite pokémons/);
  fireEvent.click(linkFavorites);
  const url = history.location.pathname;
  expect(url).toBe('/favorites');
});
