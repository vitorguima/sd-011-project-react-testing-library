import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const favoritePokemons = 'Favorite Pokémons';
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

test('O primeiro link deve possuir o texto "Home", "About", "Favorite Pokémons"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText(favoritePokemons)).toBeInTheDocument();
});

test('Teste para página "Home"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkToHome = getByText('Home');
  userEvent.click(linkToHome);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste para página "About"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkToAbout = getByText('About');
  userEvent.click(linkToAbout);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('Teste para página "Favorite Pokémons"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkToFavoritePoke = getByText(favoritePokemons);
  userEvent.click(linkToFavoritePoke);
  expect(getByText(favoritePokemons)).toBeInTheDocument();
});

test('Teste para "Página não encontrada"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/pagina-nao-encontrada'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
