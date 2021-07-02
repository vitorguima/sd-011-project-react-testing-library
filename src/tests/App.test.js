import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Component <App />', () => {
  it('Testa se a página inicial é renderizada no endpoint "/"', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    expect(pathname).toBe('/');
  });

  it('Testa se página possui links específicos', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Testa se a página muda para / ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se a página muda para /about ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se a página muda para /favorites ao clicar no link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemons = getByText('Favorite Pokémons');

    fireEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se a página renderiza NotFound ao digitar um endpoint desconhecido', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('asd');

    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
