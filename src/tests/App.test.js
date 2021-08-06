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

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByRole } = renderWithRouter(<App />);
  const home = getByRole('link', { name: 'Home' });
  const about = getByRole('link', { name: 'About' });
  const favorite = getByRole('link', { name: 'Favorite Pokémons' });
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});

test('Testa se a navegação entre as páginas está correta', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const home = getByText('Home');
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();

  fireEvent.click(home);
  expect(history.location.pathname).toBe('/');
  fireEvent.click(about);
  expect(history.location.pathname).toBe('/about');
  fireEvent.click(favorite);
  expect(history.location.pathname).toBe('/favorites');
  history.push('/path/random');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
