import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
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
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText(/about/);
  fireEvent.click(linkAbout);
  const url = history.location.pathname;
  expect(url).toBe('/about');
});

it('Teste se  redirecionaa página de `Pokémons Favoritados`, na URL `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavorites = getByText(/favorites/);
  fireEvent.click(linkFavorites);
  const url = history.location.pathname;
  expect(url).toBe('/favorites');
});
