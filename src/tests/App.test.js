import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

describe('Testing Requirement 01 - Component App.js', () => {
  it('Test if app starts in url=/ ', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('If application contains navigation links', () => {
    const { container } = renderWithRouter(<App />);
    const links = container.getElementsByTagName('a');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('Test if path=/ redirects to homepage', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const textHome = getByText(/Encountered pokémons/);
    expect(textHome).toBeInTheDocument();
  });

  it('Test if path=/about redirects to About page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Test if path=/favorites redirects to FavoritePokemons page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  it('Test Error 404 not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/poke');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
