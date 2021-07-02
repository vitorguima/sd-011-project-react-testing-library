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

test('Test navigation links', () => {
  const { getByRole } = renderWithRouter(<App />);
  const home = getByRole('link', { name: 'Home' });
  const about = getByRole('link', { name: 'About' });
  const favorite = getByRole('link', { name: 'Favorite Pokémons' });
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});
test('Test navigation is correct', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});
it('Eender "Home"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  expect(history.location.pathname).toBe('/');
});
it('Render "About"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  expect(history.location.pathname).toBe('/about');
});
it('Render "Favorite Pokémons"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite'));
  expect(history.location.pathname).toBe('/favorites');
});
it('Render "Not Found" not exist', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/path/random');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
