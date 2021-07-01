import React from 'react';
import renderRouter from '../renderRouter';
import { fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testando o component App.', () => {
  it('Verifica se a página principal é renderizada ao carregar no caminho "/"', () => {
    const { getByText } = renderRouter(<App />);
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('Verifica se o topo da página contém links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favoritePokemons = getByText(/favorite pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('Verifica se redireciona para "/" quando clica em Home.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/home/i);

    fireEvent.click(home);
    const homeURL = history.location.pathname;
    expect(homeURL).toBe('/');
  });

  it('Verifica se redireciona para "/about" quando clica em About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);

    fireEvent.click(about);
    const aboutURL = history.location.pathname;
    expect(aboutURL).toBe('/about');
  });

  it('Verifica se redireciona para "/favorites" quando clica em Favorite Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/favorite pokémons/i);

    fireEvent.click(favoritePokemons);
    const favoritePokemonsURL = history.location.pathname;
    expect(favoritePokemonsURL).toBe('/favorites');
  });

  it('Verifica se redireciona para a página Not Found se a URL for desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe');
    const notFoundMsg = getByText(/Page requested not found/i);
    expect(notFoundMsg).toBeInTheDocument();
  });
});