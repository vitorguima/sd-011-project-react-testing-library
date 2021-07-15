import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('top of the application contains a fixed set of home navigation', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/Home/i)).toBeInTheDocument();
});

test('top of the application contains a fixed set of about navigation', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/About/i)).toBeInTheDocument();
});

test('top of the application contains a fixed set of favorite navigation', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});

test('is redirected to the home page, at the URL `/` by clicking home link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test('check if the first link has the text "About" and correct path', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test('check if the first link has the text Favorite Pokémons and correct path', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});

test('redirected to the Not Found page in case of unknown URL', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/notFound');

  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});
