// Requisito resolvido revendo aulas e acessando o site:
// https://testing-library.com/docs/queries/about/

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
  const checkLinks = container.querySelectorAll('.link');
  expect(checkLinks.length >= 1).toBe(true);
});

// test('Testa se os links Home, About e Favorite Pokémons', () => {
//   const { getByText } = render(<App />);

//   expect(getByText('Home')).toBeInTheDocument();
//   expect(getByText('About')).toBeInTheDocument();
//   expect(getByText('Favorite Pokémons')).toBeInTheDocument();
// });
test('Teste se o topo da aplicação contém um link com o texto Home', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const testLink = getByText('Home');
  expect(testLink).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um link com o texto About', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const testLink = getByText('About');
  expect(testLink).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um link com o texto Favorite Pokémons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const testLink = getByText('Favorite Pokémons');
  expect(testLink).toBeInTheDocument();
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
  const testLink = getByText('Home');
  fireEvent.click(testLink);
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
  const testLink = getByText('About');
  fireEvent.click(testLink);
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
