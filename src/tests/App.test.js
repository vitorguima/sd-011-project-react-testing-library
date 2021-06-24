import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

import renderWithRouter from '../renderWithRouter';

describe('Heading da página', () => {
  it('Renderiza o título `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('Renderiza link com o texto:', () => {
  it('`Home`', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });

  it('`About`', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
  });

  it('`Favorite Pokemons`', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemonsLink = getByText(/Favorite Pokémons/i);
    expect(favoritePokemonsLink).toBeInTheDocument();
  });
});

describe('Verifica o roteamento das páginas', () => {
  it('Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    fireEvent.click(homeLink);
    const actualLocation = history.location.pathname;
    expect(actualLocation).toMatch('/');
  });

  it('About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);
    fireEvent.click(aboutLink);
    const actualLocation = history.location.pathname;
    expect(actualLocation).toMatch('/about');
  });

  it('Favorite Pokémons',() => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);
    const actualLocation = history.location.pathname;
    expect(actualLocation).toMatch('/favorites');
  });

  it('Not found', () => {
    const { queryByText, history } = renderWithRouter(<App />);
    history.push('/xablau');

    const noMatch = queryByText(/Not Found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
