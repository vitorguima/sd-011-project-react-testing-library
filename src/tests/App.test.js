import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Test the operation of navigation links', () => {
  it('Check if path="/" directs do Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    expect(getByText(/Encountered pokémons/)).toBeInTheDocument();
  });

  it('Check if path="/about/ directs do About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    expect(getByText(/About Pokédex/)).toBeInTheDocument();
  });

  it('Check if path="/favorites" directs to Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
    expect(getByText(/Favorite pokémons/)).toBeInTheDocument();
  });
});
