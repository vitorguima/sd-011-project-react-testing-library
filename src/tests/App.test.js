import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/);
  const linkAbout = getByText(/About/);
  const linkFavoritePkm = getByText(/Favorite Pokémons/);
  expect(linkAbout).toBeInTheDocument();
  expect(linkHome).toBeInTheDocument();
  expect(linkFavoritePkm).toBeInTheDocument();
});

// test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
//   const { getByText } = renderWithRouter(<App />);
//   const linkAbout = getByText(/About/);
//   expect(linkAbout).toBeInTheDocument();
// });

// test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
//   const { getByText } = renderWithRouter(<App />);
//   const linkFavoritePkm = getByText(/Favorite Pokémons/);
//   expect(linkFavoritePkm).toBeInTheDocument();
// });

test(`Testa se ao clicar no link Home
  da barra de navegação a pagina é redirecionada`, () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const homePath = history.location.pathname;
  expect(homePath).toBe('/');
  const pokedex = getByText(/Pokédex/);
  expect(pokedex).toBeInTheDocument();
});

test(`Testa se ao clicar no link About 
  da barra de navegação a pagina é redirecionada`, () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const homePath = history.location.pathname;
  expect(homePath).toBe('/about');
  const AboutPokedex = getByText(/About Pokédex/);
  expect(AboutPokedex).toBeInTheDocument();
});

test(`Testa se ao clicar no link About 
  da barra de navegação a pagina é redirecionada`, () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const homePath = history.location.pathname;
  expect(homePath).toBe('/favorites');
  const AboutPokedex = getByText(/Favorite pokémons/);
  expect(AboutPokedex).toBeInTheDocument();
});

it(`Teste se a aplicação é redirecionada para 
  a página Not Found ao entrar em uma URL desconhecida.`, () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const pkmNoMatch = getByText(/Page requested not found/i);
  expect(pkmNoMatch).toBeInTheDocument();
});
