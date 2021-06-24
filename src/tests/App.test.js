import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('shows the Pokédex when the route is `/`.', () => {
  test('Teste o componente About.js .', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a pg de Pokémons Favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notFound');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
