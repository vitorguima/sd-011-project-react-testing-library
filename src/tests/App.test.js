import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('verifica a página inicial Pokédex é renderizada ao carregar o caminho "/"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const defaultPage = getByText(/Encountered pokémons/i);
  expect(defaultPage).toBeInTheDocument();
  const { location } = history;
  const { pathname } = location;
  expect(pathname).toBe('/');
});

it('verifica se o header contém os links de Home, About e Favorite Pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/i);
  expect(linkHome).toBeInTheDocument();
  const linkAbout = getByText(/About/i);
  expect(linkAbout).toBeInTheDocument();
  const linkFavoritePokemons = getByText(/Favorite Pokémons/i);
  expect(linkFavoritePokemons).toBeInTheDocument();
});

it('verifica se ao clicar no Home a página volta para a URL / ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText('Home');
  fireEvent.click(linkHome);
  const { location } = history;
  const { pathname } = location;
  expect(pathname).toBe('/');
});

it('verifica se ao clicar no About direciona para a página About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText('About');
  fireEvent.click(linkAbout);
  const { location } = history;
  const { pathname } = location;
  expect(pathname).toBe('/about');
});

it('verifica se direciona para a página Pokémons Favoritos', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavoritePokemons = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavoritePokemons);
  const { location } = history;
  const { pathname } = location;
  expect(pathname).toBe('/favorites');
});

it('verifica se renderiza NotFound', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/nada');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
