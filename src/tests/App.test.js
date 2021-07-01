import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se renderiza a rota "/"', () => {
  renderWithRouter(<App />);

  const mainText = screen.getByText(/Encountered pokémons/i);
  expect(mainText).toBeInTheDocument();
});

test('Testa os links do topo', () => {
  renderWithRouter(<App />);

  const firstLink = screen.getByText(/Home/i);
  expect(firstLink).toBeInTheDocument();

  const secondLink = screen.getByText(/About/i);
  expect(secondLink).toBeInTheDocument();

  const thirdLink = screen.getByText(/Favorite Pokémons/i);
  expect(thirdLink).toBeInTheDocument();
});

test('Testa o redirecionamento na url "/" ao clicar em "Home"', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const linkHome = getByRole('link', { name: /Home/i });
  userEvent.click(linkHome);

  const url = history.location.pathname;
  const heading = getByText(/Pokédex/i);
  expect(url).toBe('/');
  expect(heading).toBeInTheDocument();
});

test('Testa se redireciona para a página de "About", na URL "/about"', () => {
  const { getByText, history, getByRole } = renderWithRouter(<App />);
  const linkAbout = getByRole('link', { name: /about/i });
  userEvent.click(linkAbout);

  const urlAbout = history.location.pathname;
  const headingAbout = getByText(/about pokédex/i);
  expect(urlAbout).toBe('/about');
  expect(headingAbout).toBeInTheDocument();
});

test('Teste se redireciona página de `Pokémons Favoritados`, na URL `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App/>);
  const linkFavorites = getByText(/Favorite pokémons/);
  fireEvent.click(linkFavorites);
  const url = history.location.pathname;
  expect(url).toBe('/favorites');
});
