import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

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

test('Teste se a aplicação contém um conjunto fixo de links de navegação.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('Ao clicar em `/` direciona para home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const Home = getByText('Home');
  fireEvent.click(Home);

  const url = history.location.pathname;
  expect(url).toBe('/');
});

test('Ao clicar em `About` direciona para /about', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const About = getByText('About');
  fireEvent.click(About);

  const url = history.location.pathname;
  expect(url).toBe('/about');
});

test('Ao clicar em `Favorite Pokémons` direciona para /favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const Favorite = getByText('Favorite Pokémons');
  fireEvent.click(Favorite);

  const url = history.location.pathname;
  expect(url).toBe('/favorites');
});

it('Deve renderizar a NotFound caso seja uma rota não existente', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const rotaErrada = '/LetsGo';
  history.push(rotaErrada);

  const erroPage = getByText(/Page requested not found/);
  expect(erroPage).toBeInTheDocument();
});
