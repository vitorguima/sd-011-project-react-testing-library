import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se a página principal da Pokédex está no caminho URL /.', () => {
  const { getByText } = renderWithRouter(<App />);
  const pageTest = getByText(/Encountered pokémons/);
  expect(pageTest).toBeInTheDocument();
});

test('Testa se o topo do APP contém links de navegacão', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkTestHome = getByText(/Home/);
  const linkTestAbout = getByText(/About/);
  const linkTestFavoritePokemons = getByText(/Favorite Pokémons/);
  expect(linkTestHome).toBeInTheDocument();
  expect(linkTestAbout).toBeInTheDocument();
  expect(linkTestFavoritePokemons).toBeInTheDocument();
});

test('Testa se o App é redirecionada para URL / ao clicar no botão', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testa se o App é redirecionada para URL /about ao clicar no botão', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Testa se o App é redir. para URL /Favorite Pokémons ao clicar no botão', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Testa se o App é redirecionada para na URL /not found ao clicar no botão', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const notFound = '/not';
  history.push(notFound);
  const erroPage = getByText(/Page requested not found/);
  expect(erroPage).toBeInTheDocument();
});
