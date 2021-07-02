import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testando o app.js', () => {
  it('Teste se a página principal da Pokédex é renderizada ao carregar a tela', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');
    const encounteredPokemons = getByText('Encountered pokémons');
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL "/"', () => {
    const { getByText, history: { location: { pathname } } } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const pathName = pathname;
    expect(pathName).toBe('/');
    const encounteredPokemons = getByText('Encountered pokémons');
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
    const encounteredPokemons = getByText('About Pokédex');
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
    const encounteredPokemons = getByText('Favorite pokémons');
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página "Not Found"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const encounteredPokemons = getByText('Page requested not found');
    expect(encounteredPokemons).toBeInTheDocument();
  });
});
