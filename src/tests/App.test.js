import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

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

test('Ao clicar em About, deve renderizar o componente About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const aboutButton = getByText('About');
  expect(aboutButton).toBeInTheDocument();
  fireEvent.click(aboutButton);
  const aboutPathname = history.location.pathname;
  expect(aboutPathname).toBe('/about');
  const aboutPokedex = getByText(/About Pokédex/);
  expect(aboutPokedex).toBeInTheDocument();
});

test('Ao clicar em Home, deve renderizar o componente Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const homeButton = getByText('Home');
  expect(homeButton).toBeInTheDocument();
  fireEvent.click(homeButton);
  const homePathname = history.location.pathname;
  expect(homePathname).toBe('/');
});

test('Ao clicar em Favorite Pokémons, deve renderizar o componente Favorite', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favoriteButton = getByText('Favorite Pokémons');
  expect(favoriteButton).toBeInTheDocument();
  fireEvent.click(favoriteButton);
  const favPathname = history.location.pathname;
  expect(favPathname).toBe('/favorites');
  const favPokemons = getByText('Favorite pokémons');
  expect(favPokemons).toBeInTheDocument();
});

test('Um caminho inexistente leva para o componente Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/xablau');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
