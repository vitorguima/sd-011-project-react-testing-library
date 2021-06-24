import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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

it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const title = getByText(/Encountered pokémons/i);
  expect(title).toBeInTheDocument();
  const home = getByText(/Home/i);
  fireEvent.click(home);

  const link = history.location.pathname;
  expect(link).toBe('/');

  const about = getByText(/About/i);
  fireEvent.click(about);
  const linkAbout = history.location.pathname;
  expect(linkAbout).toBe('/about');

  const Favorites = getByText(/Favorite Pokémons/i);
  fireEvent.click(Favorites);
  const linkFavorites = history.location.pathname;
  expect(linkFavorites).toBe('/favorites');
});
