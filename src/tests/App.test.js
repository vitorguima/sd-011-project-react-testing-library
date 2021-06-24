import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Testa se Home é renderizado em `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

it('Testa se Home renderiza o texto `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('Testa se ao entrar em URL desconhecida renderiza `Not Found', () => {
  const { history, container } = renderWithRouter(<App />);
  const rotaErrada = '/eita';
  history.push(rotaErrada);
  expect(container.innerHTML).toMatch(/Page requested not found/);
});

describe('Testa o conjunto de links fixos da `Home`', () => {
  it('Testa se o primeiro link renderiza `Home`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/);
    const linkAbout = getByText(/About/);
    fireEvent.click(linkAbout);
    fireEvent.click(linkHome);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  it('Testa se o segundo link renderiza `About`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/);
    fireEvent.click(linkAbout);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

  it('Testa se o terceiro link renderiza `Favorite Pokémons`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorite = getByText(/Favorite Pokémons/);
    fireEvent.click(linkFavorite);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
});
