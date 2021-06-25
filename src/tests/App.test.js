import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
// import NotFound from './NotFound.test';

describe('Testa o requisito 01: ', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página Pokédex é renderizada pelo caminho de URL /', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  test('Testa links de navegação na aplicação(Home, About e Favorite Pokémons): ', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    expect(nav).toBeInTheDocument();

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  test('Testa redirecionamento à Home ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa redirecionamento à About ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa redirecionamento à Favorites ao clicar no link Pokémons Favoritos', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa redirecionamento à página NotFound ao usar uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const unknownUrl = '/xablau';
    history.push(unknownUrl);

    // OUTRO MÉTODO - Feito na aula ao vivo
    // expect(container.innerHTML).toMatch(/Page requested not found/)
    // importando assim o container na linha 57
    const error404 = getByText(/Page requested not found/);
    expect(error404).toBeInTheDocument();
  });
});
