import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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

test('Teste se a página principal da Pokédex é renderizada no caminho de URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
});

test('O primeiro link deve possuir o texto Home', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText('Home');
  expect(about).toBeInTheDocument();
});

test('O primeiro link deve possuir o texto About', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText('About');
  expect(about).toBeInTheDocument();
});

test('O primeiro link deve possuir o texto Favorite Pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText('Favorite Pokémons');
  expect(about).toBeInTheDocument();
});
