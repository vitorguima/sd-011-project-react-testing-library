import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const favoriteGlobal = 'Favorite Pokémons';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Test navigation links', () => {
  const { getByRole } = renderWithRouter(<App />);
  expect(getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(getByRole('link', { name: 'About' })).toBeInTheDocument();
  expect(getByRole('link', { name: favoriteGlobal })).toBeInTheDocument();
});
test('Test navigation is correct', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText(favoriteGlobal)).toBeInTheDocument();
});
test('Eender "Home"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  expect(history.location.pathname).toBe('/');
});
test('Render "About"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  expect(history.location.pathname).toBe('/about');
});
test('Render "Favorite Pokémons"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(favoriteGlobal));
  expect(history.location.pathname).toBe('/favorites');
});
test('Render "Not Found" not exist', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/path/random');
  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});
