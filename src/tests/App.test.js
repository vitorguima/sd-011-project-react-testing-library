import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

test('Teste se a página principal da Pokédex é renderizada', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('No caminho `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByRole } = renderWithRouter(<App />);
  const link1 = getByRole('link', {
    name: /about/i,
  });
  const link2 = getByRole('link', {
    name: /favorite pokémons/i,
  });
  const link3 = getByRole('link', {
    name: /Home/i,
  });
  expect(link1).toBeInTheDocument();
  expect(link2).toBeInTheDocument();
  expect(link3).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página inicial', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const link = getByRole('link', {
    name: /home/i,
  });
  userEvent.click(link);
  const pathName = history.location.pathname;
  const heading = getByText(/Pokédex/i);
  expect(pathName).toBe('/');
  expect(heading).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página de About', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const link = getByRole('link', {
    name: /about/i,
  });
  userEvent.click(link);
  const pathName = history.location.pathname;
  const heading = getByText(/about pokédex/i);
  expect(pathName).toBe('/about');
  expect(heading).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const link = getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(link);
  const pathName = history.location.pathname;
  const heading = getByText('Favorite Pokémons');
  expect(pathName).toBe('/favorites');
  expect(heading).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página Not Found.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/page/not-found');
  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
});
