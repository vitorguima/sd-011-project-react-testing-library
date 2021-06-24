import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('test the componet <App />', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders links to Home About and Favourite Pokemons on the top of the page', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkList = getAllByRole('link');
    expect(linkList[0]).toBeInTheDocument();
    expect(linkList[0]).toHaveTextContent('Home');
    expect(linkList[1]).toBeInTheDocument();
    expect(linkList[1]).toHaveTextContent('About');
    expect(linkList[2]).toBeInTheDocument();
    expect(linkList[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('the aplication is redirect to "/" when the link "Home" is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText('Home');
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeTitle = getByText(/Encountered pokémons/);
    expect(homeTitle).toBeInTheDocument();
  });

  it('the aplication is redirect to "/about" when the link "About" is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutTitle = getByText(/About Pokédex/);
    expect(aboutTitle).toBeInTheDocument();
  });

  it('the aplication is redirect to "/favorites" when the link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavourite = getByText('Favorite Pokémons');
    fireEvent.click(linkFavourite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoritesTitle = getByText(/Favorite pokémons/);
    expect(favoritesTitle).toBeInTheDocument();
  });

  it('renders not found for a unesxisting route', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
