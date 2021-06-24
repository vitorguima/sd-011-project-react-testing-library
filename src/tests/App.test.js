import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se a página principal é renderizada ao carregar no caminho `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testa se o topo da aplicação tem um conjunto de links de navegação', () => {
  const { getAllByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const btn = getAllByRole('link');
  expect(btn[0]).toHaveTextContent('Home');
  expect(btn[1]).toHaveTextContent('About');
  expect(btn[2]).toHaveTextContent('Favorite Pokémons');
});

test('Testa se ao clicar no botão home é redirecionado para o caminho `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const btn = getByText('Home');
  fireEvent.click(btn);
  const pathName = history.location.pathname;
  expect(pathName).toBe('/');
});

test('Testa se ao clicar no botão about é redirecionado para o caminho `/about`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const btn = getByText('About');
  fireEvent.click(btn);
  const pathName = history.location.pathname;
  expect(pathName).toBe('/about');
});

test('Testa se ao clicar em Pokémons Favoritados é redirecionado p/ `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const btn = getByText('Favorite Pokémons');
  fireEvent.click(btn);
  const pathName = history.location.pathname;
  expect(pathName).toBe('/favorites');
});

test('Testa se quando uma página não é encontrada`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/paginaErrada');
  const notFound = getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});
