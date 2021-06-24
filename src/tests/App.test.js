import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a pag inicial ao clicar em Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const home = getByText('Home');
  fireEvent.click(home);
  const page = history.location.pathname;
  expect(page).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página de About, na URL /about', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const about = getByText('About');
  fireEvent.click(about);
  const page = history.location.pathname;
  expect(page).toBe('/about');
});

test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favorites = getByText('Favorite Pokémons');
  fireEvent.click(favorites);
  const page = history.location.pathname;
  expect(page).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found', () => {
  const { history, getByText } = renderWithRouter(<App />);
  history.push('/xablau');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
