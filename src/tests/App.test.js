import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componete App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Teste se o topo da aplicação contém um conjunto fixo de links'
  + 'de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    const linkAbout = getByText(/About/i);
    const linkFavoritePokémons = getByText(/Favorite Pokémons/i);
    expect(linkHome).toBeDefined();
    expect(linkAbout).toBeDefined();
    expect(linkFavoritePokémons).toBeDefined();
  });
  test('Teste se Home é renderizada ao carregar a aplicação no caminho de URL /.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    expect(history.location.pathname).toBe('/');
  });
  test('Teste se About é renderizada ao carregar a aplicação no caminho de '
  + 'URL /About.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se Favorite Pokémons é renderizada ao carregar a aplicação no '
  + 'caminho de URL /favorites.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });
  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
