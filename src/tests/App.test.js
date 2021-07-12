import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Verifica se os links estão na pagina e funcionais', () => {
  it('Verifica se os links existem', () => {
    const { getByText } = renderWithRouter(<App />);

    const firstLink = getByText(/Home/);
    const thirdLink = getByText(/Favorite Pokémons/);
    const secondLink = getByText(/About/);

    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  });

  it('Verifica se ao clicar no link Home vai a pagina indicada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/);
    fireEvent.click(homeLink);

    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  it('Verifica se ao clicar no link About vai a pagina indicada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/);
    fireEvent.click(aboutLink);

    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

  it('Verifica se ao clicar no link Favorite Pokemons vai a pagina indicada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favPokemonsLink = getByText(/Favorite Pokémons/);
    fireEvent.click(favPokemonsLink);

    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
});
