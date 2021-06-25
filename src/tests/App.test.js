import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes requisito 1', () => {
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
    const { getByText, history } = renderWithRouter(<App />);

    const homePath = history.location.pathname;
    history.push(homePath);
    expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
  });

  it('shows if there are three nav links: Home, About, Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/about/i)).toBeInTheDocument();
    expect(getByText(/favorite pokémons/i)).toBeInTheDocument();
  });

  it('test if nav Home link brings back to homepage', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const homePath = history.location.pathname;
    const navHome = getByText(/Home/i);
    const homeText = getByText(/encountered pokémons/i);

    fireEvent.click(navHome);

    expect(homePath).toBe('/');
    expect(homeText).toBeInTheDocument();
  });

  it('test if nav About goes to /about page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const navAbout = getByText(/about/i);
    const aboutPath = '/about';

    fireEvent.click(navAbout);
    history.push(aboutPath);

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(aboutPath).toBe('/about');
  });

  it('test if nav Favorite Pokemons goest to /favorites page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const navFavorites = getByText(/favorite/i);
    const favoritesPath = '/favorites';

    fireEvent.click(navFavorites);
    history.push(favoritesPath);

    expect(favoritesPath).toBe('/favorites');
  });

  // it('test if theres no URL matching, return Not Found page', () => {
  //   { getByText, history} = renderWithRouter(<Appzz)
  // })
});
