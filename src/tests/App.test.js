import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('test component App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Test if the first link contains the text "Home"', () => {
    const { getByText } = renderWithRouter(<App />);
    const firstLink = getByText(/Home/i);
    expect(firstLink).toBeInTheDocument();
  });

  it('Test if the second link contains the text "About"', () => {
    const { getByText } = renderWithRouter(<App />);
    const secondLink = getByText(/About/i);
    expect(secondLink).toBeInTheDocument();
  });

  it('Test if the third link contains the text "Favorite Pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);
    const secondLink = getByText(/Favorite Pokémons/i);
    expect(secondLink).toBeInTheDocument();
  });

  it('The page is redirected to Home "/", once Home Link is clicked', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const allLinks = getAllByRole(/Link/i);
    fireEvent.click(allLinks[0]);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('The page is redirected to "/about", once About Link is clicked', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const allLinks = getAllByRole(/Link/i);
    fireEvent.click(allLinks[1]);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('The page is redirected to "/favorites", once Favorite Link is clicked', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const allLinks = getAllByRole(/Link/i);
    fireEvent.click(allLinks[2]);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('The page is redirected to "Not Found", once entered with a unknown URL', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/xablau');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
