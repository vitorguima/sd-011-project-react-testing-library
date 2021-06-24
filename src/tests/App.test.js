import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests of App component', () => {
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
  test('Show links to other pages', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/favorite pokémons/i)).toBeInTheDocument();
  });
  test('Go to / if clicked on Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/home/i);
    fireEvent.click(home);
    const url = history.location.pathname;
    expect(url).toBe('/');
    const titlePage = getByText(/Encountered pokémons/);
    expect(titlePage).toBeInTheDocument();
  });
  test('Go to /about if clicked on About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/about/i);
    fireEvent.click(about);
    const url = history.location.pathname;
    expect(url).toBe('/about');
    const titlePage = getByText(/about pokédex/i);
    expect(titlePage).toBeInTheDocument();
  });
  test('Go to /favorites if clicked on Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
    const titlePage = getByText(/Favorite pokémons/);
    expect(titlePage).toBeInTheDocument();
  });
  test('Go to /Not Found if enter unknown url', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const wrongPage = '/alo';
    history.push(wrongPage);
    const errorPage = getByText(/😭/);
    expect(errorPage).toBeInTheDocument();
  });
});
