import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
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

test('tests if the home show a fixed row of links', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const linkHome = getByText(/Home/);
  expect(linkHome).toBeInTheDocument();
  const linkAbout = getByText(/About/);
  expect(linkAbout).toBeInTheDocument();
  const linkFavoritePokemons = getByText(/Favorite Pokémons/);
  expect(linkFavoritePokemons).toBeInTheDocument();
});

test('tests if the Home Link redirects to "/" path', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/);
  fireEvent.click(linkHome);
  const url = history.location.pathname;
  expect(url).toBe('/');
});

test('tests if the About Link redirects to "/about" path', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText(/About/);
  fireEvent.click(linkAbout);
  const url = history.location.pathname;
  expect(url).toBe('/about');
});

test('tests if the Favorite Pokémons Link redirects to "/favorites" path', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavs = getByText(/Favorite Pokémons/);
  fireEvent.click(linkFavs);
  const url = history.location.pathname;
  expect(url).toBe('/favorites');
});

test('tests if a unexpected path redirects to NotFound component', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const wrongRoute = '/wrong';
  history.push(wrongRoute);
  const notFound = getByText(/Page requested not found/);
  expect(notFound).toBeInTheDocument();
});
