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

describe('testing App component', () => {
  it('render home page when the path is /', () => {
    const { getByText } = renderWithRouter(<App />);
    const name = getByText(/Encountered pokémons/i);
    expect(name).toBeInTheDocument();
  });

  it('testing nav links', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favorite = getByText(/favorite pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('redirecting to Home Page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/home/i));
    expect(history.location.pathname).toBe('/');
  });

  it('redirecting to de About Page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/about/i));
    expect(history.location.pathname).toBe('/about');
  });

  it('redirecting to Favorite Pokemom Page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('redirection to Not Found Page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/path/random-page');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
