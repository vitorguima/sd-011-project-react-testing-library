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

test('check if homePage is rendered at url', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Test if heading of the page has navegation links', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const links = getByRole('navigation');
  expect(links).toBeInTheDocument();

  const linkHome = getByRole('link', { name: 'Home' });
  expect(linkHome).toBeInTheDocument();
  const linkAbout = getByRole('link', { name: 'About' });
  expect(linkAbout).toBeInTheDocument();
  const linkFavorite = getByRole('link', { name: 'Favorite Pokémons' });
  expect(linkFavorite).toBeInTheDocument();
});

test('should redirect to "/" if Home link is clicked', () => {
  const { getByRole } = render();
  const { history } = renderWithRouter(<App />);

  fireEvent.click(getByRole('link', { name: 'Home' }));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('should redirect to "/about" if about link is clicked', () => {
  const { getByRole } = render();
  const { history } = renderWithRouter(<App />);

  fireEvent.click(getByRole('link', { name: 'About' }));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('should redirect to "/favorites" if Favorite Pokémons link is clicked', () => {
  const { getByRole } = render();
  const { history } = renderWithRouter(<App />);

  fireEvent.click(getByRole('link', { name: 'Favorite Pokémons' }));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('should redirect to page not Foud if path does not exist', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/kamehameha');
  const pageNotFound = getByText('Page requested not found');
  expect(pageNotFound).toBeInTheDocument();
});
