import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const links = container.querySelectorAll('.link');
  // console.log(links.length);
  expect(links.length >= 1).toBe(true);
});

test('Teste se o topo da aplicação contém um link com o texto Home', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText('Home');
  expect(homeLink).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um link com o texto About', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = getByText('About');
  expect(aboutLink).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um link com o texto Favorite Pokémons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoriteLink = getByText('Favorite Pokémons');
  expect(favoriteLink).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a URL / ao clicar no link Home', () => {
  let testLocation;
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
      <Route
        path="*"
        render={ ({ location }) => {
          testLocation = location;
          return null;
        } }
      />
    </MemoryRouter>,
  );
  const homeLink = getByText('Home');
  fireEvent.click(homeLink);
  expect(testLocation.pathname).toBe('/');
});

test('Testa se a aplicação é redirecionada para a /about, clicando no link About', () => {
  let testLocation;
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
      <Route
        path="*"
        render={ ({ location }) => {
          testLocation = location;
          return null;
        } }
      />
    </MemoryRouter>,
  );
  const aboutLink = getByText('About');
  fireEvent.click(aboutLink);
  expect(testLocation.pathname).toBe('/about');
});

test('Testa se a aplicação vai para /favorites, clicando em Favorite Pokémons', () => {
  let testLocation;
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
      <Route
        path="*"
        render={ ({ location }) => {
          testLocation = location;
          return null;
        } }
      />
    </MemoryRouter>,
  );
  const favoriteLink = getByText('Favorite Pokémons');
  fireEvent.click(favoriteLink);
  expect(testLocation.pathname).toBe('/favorites');
});

test('Teste se a aplicação é vai para Not Found ao digitar uma URL desconhecida', () => {
  const { container } = render(
    <MemoryRouter initialEntries={ ['/other'] }>
      <App />
    </MemoryRouter>,
  );
  expect(container.querySelector('.not-found')).toBeInTheDocument();
});
