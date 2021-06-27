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

test('Teste se o topo contém um conjunto (Home, About e Favorite) links', () => {
  const { getByText } = renderWithRouter(<App />);

  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();
  const favorites = getByText(/Favorite Pokémons/i);
  expect(favorites).toBeInTheDocument();
});

test('Redireciona para "/", "/about", "/favorites" e "NotFound.js"', () => {
  const { getByText, history, container } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  const favorites = getByText(/Favorite Pokémons/i);
  const rotaErrada = '/seila';

  let url = history.location.pathname;
  fireEvent.click(home);
  expect(url).toBe('/');
  fireEvent.click(about);
  url = history.location.pathname;
  expect(url).toBe('/about');
  fireEvent.click(favorites);
  url = history.location.pathname;
  expect(url).toBe('/favorites');
  history.push(rotaErrada);
  expect(container.innerHTML).toMatch('Page requested not found');
});
