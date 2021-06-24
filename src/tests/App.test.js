import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Teste se contém um conjunto fixo de links de navegação.', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto FavoritePoke', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteLink).toBeInTheDocument();
  });
});

test('Teste se a aplicação é redirecionada para a página inicial ao clicar Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const aboutLink = getByText(/About/);
  fireEvent.click(aboutLink);
  let { pathname } = history.location;
  expect(pathname).toBe('/about');
  const homeLink = getByText(/Home/);
  fireEvent.click(homeLink);
  pathname = history.location.pathname;
  expect(pathname).toBe('/');
});

test('Redireciona pra URL /about ao clicou no link about', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const aboutLink = getByText('About');
  userEvent.click(aboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Redireciona pra URL /favorites ao clicou no link Favorites Pokemon', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favoriteLink = getByText(/Favorite Pokémons/);
  userEvent.click(favoriteLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Not Found em URL desconhecida', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/urlnaoexistente');
  const notFoundPage = getByText(/requested not found/);
  expect(notFoundPage).toBeInTheDocument();
});
