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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Check Links', () => {
  it('checks if a Link has the text Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const home = getByText(/Home/);
    expect(home).toBeInTheDocument();
  });

  it('checks if a Link has the text About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const about = getByText(/About Pokédex/);
    expect(about).toBeInTheDocument();
  });

  it('checks if a Link has the text Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favPoks = getByText(/Favorite Pokémons/);
    expect(favPoks).toBeInTheDocument();
  });
  it('checks if Not Found is working', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page/not-found/');
    const noMatch = getByText(/not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
