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

test('Testa se App tem a roda / e se tem os links Home, About e Favorite`', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const url = history.location.pathname;
  expect(url).toBe('/');

  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();

  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();

  const favorite = getByText(/Favorite Pokémons/i);
  expect(favorite).toBeInTheDocument();
});
