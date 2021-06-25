import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
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

it(' Teste 1/1: verifica se app é renderizado na rota /', () => {
  const { history, getByText } = renderWithRouter(<App />);
  // const rota = getByText('/');
  const home = getByText('Pokédex');

  const url = history.location.pathname;
  expect(url).toBe('/');
  expect(home).toBeInTheDocument();
});

it(' Teste 2/1: verifica se há um conjunto de links', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  const about = getByText(/About/);
  const favoritePokemons = getByText(/Favorite Pokémons/);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});
