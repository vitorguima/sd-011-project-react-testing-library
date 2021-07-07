import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('testes de inicialização da página', () => {
  it('Verifica se a página Home é renderizada ao iniciar', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const title = getByText(/encountered pokémon/i);
    expect(title).toBeInTheDocument();
  });

  it('Verifica a Existência dos Links Home, About e Favorite Pokémons na página.', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favPokemon = getByText(/Favorite pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemon).toBeInTheDocument();
  });
});

describe('teste de rotas e renderização da página Home', () => {
  it('Verifica se quando clicado o link "home" leva à página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />, ['/about']);
    const link = getByText(/Home/i);

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Verifica se a página home é renderizada após clicar no link home', () => {
    const { getByText, getByRole } = renderWithRouter(<App />, ['/about']);
    const link = getByText(/Home/i);

    userEvent.click(link);
    const title = getByRole('heading', { level: 2, name: /encountered pokémons/i });

    expect(title).toBeInTheDocument();
  });
});

describe('teste de rotas e renderização da página about', () => {
  it('Verifica se quando clicado o link home leva à página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/about/i);

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Verifica se a página home é renderizada após clicar no link "home"', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const link = getByText(/about/i);

    userEvent.click(link);
    const title = getByRole('heading', { level: 2, name: /about/i });

    expect(title).toBeInTheDocument();
  });
});

describe('teste de rotas e renderização da página favorite Pokemons', () => {
  it('Verifica se quando clicado o link home leva à página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/favorite pokémons/i);

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Verifica se a página home é renderizada após clicar no link "home"', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const link = getByText(/favorite pokémons/i);

    userEvent.click(link);
    const title = getByRole('heading', { level: 2, name: /favorite pokémons/i });

    expect(title).toBeInTheDocument();
  });
});

describe('teste de rotas e renderização da página "not found"', () => {

  it(
    'Verifica se a página not found é renderizada ao acessar uma rota inexistente',
    () => {
      const { getByRole } = renderWithRouter(<App />, ['shalalala']);

      const title = getByRole('heading', { level: 2, name: /not found/i });

      expect(title).toBeInTheDocument();
    },
  );
});
