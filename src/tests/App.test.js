import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('testa se tem links', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText(/home/i)).toBeInTheDocument();
  expect(getByText(/About/i)).toBeInTheDocument();
  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText(/Home/i);
  fireEvent.click(link);
  const url = history.location.pathname;
  expect(url).toBe('/');
});

test('Teste se a aplicação ao clicar em about vai até /about', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText(/About/i);
  fireEvent.click(link);
  const url = history.location.pathname;
  expect(url).toBe('/about');
});

test('clicar em Favorite Pokémons vai até /Favorite Pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText(/Favorite Pokémons/i);
  fireEvent.click(link);
  const url = history.location.pathname;
  expect(url).toBe('/favorites');
});

test('Teste se a aplicação vai para not found quando o link não existe', () => {
  const { history, container } = renderWithRouter(<App />);
  history.push('/noExist');
  expect(container.innerHTML).toMatch(/Not Found/i);
});

// acessar os  elementos da sua tela
// interagir com esses elementos se for o caso
// fazer os teste - expect
