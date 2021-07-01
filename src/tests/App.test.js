import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('renders a reading with the text `Pokédex` ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('links in nav with text `Home`, `About` and `Favorite Pokémons`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const firstLink = getByText(/Home/);
  const secondLink = getByText(/About/);
  const thirdLink = getByText(/Favorite Pokémons/);

  expect(firstLink).toBeInTheDocument();
  expect(secondLink).toBeInTheDocument();
  expect(thirdLink).toBeInTheDocument();
});

test('link `Home` redirect to href `/`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = getByText(/Home/);
  expect(homeLink).toHaveAttribute('href', '/');
});

test('link `About` redirect to href `/about`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const aboutLink = getByText(/About/);
  expect(aboutLink).toHaveAttribute('href', '/about');
});

test('link `Favorite Pokémons` redirect to href `/favorites`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoritesLink = getByText(/Favorite Pokémons/);
  expect(favoritesLink).toHaveAttribute('href', '/favorites');
});

test('redirect to `Not Found` page at an unknown URL', () => {
  const { history, container } = renderWithRouter(<App />);

  const unknownURL = '/xasldadk';
  history.push(unknownURL);

  expect(container.innerHTML).toMatch(/Page requested not found/i);
});
