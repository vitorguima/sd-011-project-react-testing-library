import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from './App';
import { fireEvent } from '@testing-library/dom';

test('shows the Pokédex when the route is `/`.', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
})

test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i))
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
})

test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i))
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
})

test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i))
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
})

test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/notFound');
  expect(getByText('Page requested not found')).toBeInTheDocument();
})
