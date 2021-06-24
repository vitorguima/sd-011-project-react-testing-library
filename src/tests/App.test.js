import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('testa se a aplicação é redirecionada para a página de Home, na URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const homeAll = getByText(/Encountered pokémons/i);
  expect(homeAll).toBeInTheDocument();
});

test('testa se a aplicação é redirecionada para a página de About, na URL /about', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const aboutAll = getByText(/About Pokédex/);
  expect(aboutAll).toBeInTheDocument();
});

test('testa se a aplicação é redirecionada para a URL /favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const aboutAll = getByText(/Favorite pokémons/);
  expect(aboutAll).toBeInTheDocument();
});

test('testa se a aplicação é redirecionada para a página Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/digimon');
  const notFound = getByText(/Page requested not found/);
  expect(notFound).toBeInTheDocument();
});
