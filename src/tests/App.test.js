import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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

test('Página principal é renderizada ao carregar aplicação no caminho de URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const homeText = getByText(/Encountered pokémons/);
  expect(homeText).toBeInTheDocument();
});

test('Topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const buttons = getAllByRole('link');

  const homeButton = buttons[0];
  expect(homeButton).toBeInTheDocument();
  expect(homeButton).toContainHTML('Home');

  const aboutButton = buttons[1];
  expect(aboutButton).toBeInTheDocument();
  expect(aboutButton).toContainHTML('About');

  const favoriteButton = buttons[2];
  expect(favoriteButton).toBeInTheDocument();
  expect(favoriteButton).toContainHTML('Favorite Pokémons');
});

test('Redirecionamento da página Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const homeText = getByText(/Encountered pokémons/);
  expect(homeText).toBeInTheDocument();
});

test('Redirecionamento da página About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const aboutText = getByText(/About Pokédex/);
  expect(aboutText).toBeInTheDocument();
});

test('Redirecionamento da página Favorite Pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const favoriteText = getByText(/Favorite pokémons/);
  expect(favoriteText).toBeInTheDocument();
});

test('Redirecionamento da página 404', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/favotire-pokemon');
  const errorPage = getByText(/Page requested not found/);
  expect(errorPage).toBeInTheDocument();
});
