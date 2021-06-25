import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test component app', () => {
  it('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verify if the main page is "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const mainPage = getByText(/Encountered pokémons/);
    expect(pathname).toBe('/');
    expect(mainPage).toBeInTheDocument();
  });

  it('Verify if text in links are correct', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const link = getAllByRole('link');

    expect(link[0]).toHaveTextContent('Home');
    expect(link[1]).toHaveTextContent('About');
    expect(link[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('Verify if click in link "home" redirect correct', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    fireEvent.click(getByText(/Home/));
    expect(pathname).toBe('/');
    const mainPage = getByText(/Encountered pokémons/);
    expect(mainPage).toBeInTheDocument();
  });

  it('Verify if click in link "about" redirect correct', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutPage = getByText(/About Pokédex/);
    expect(aboutPage).toBeInTheDocument();
  });

  it('Verify if click in link "favorite" redirect correct', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoritePage = getByText(/Favorite pokémons/);
    expect(favoritePage).toBeInTheDocument();
  });

  it('Verify if notfound redirect correct', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page/notfound/');
    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
