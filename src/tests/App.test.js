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

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getAllByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const linksPage = getAllByRole('link');
  const linkHome = linksPage[0].innerHTML;
  const linkAbout = linksPage[1].innerHTML;
  const linkFavPoke = linksPage[2].innerHTML;

  expect(linkHome).toBe('Home');
  expect(linkAbout).toBe('About');
  expect(linkFavPoke).toBe('Favorite Pokémons');
});

test('Teste se a aplicação é redirecionada para a URL / ao clicar no link Home.', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const linkHome = getByText(/Home/);
  fireEvent.click(linkHome);

  const url = history.location.pathname;
  expect(url).toBe('/');

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada URL /about, ao clicar no link About.', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const linkHome = getByText(/About/);
  fireEvent.click(linkHome);

  const url = history.location.pathname;
  expect(url).toBe('/about');

  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('Deve renderizar a ErrorPage caso seja uma rota não existente', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const rotaErrada = '/xablau';
  history.push(rotaErrada);

  expect(getByText('Page requested not found')).toBeInTheDocument();
});
