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
  // Starting the Project
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Teste o component <APP.js />', () => {
  test('Teste se a página principal da Pokédex é renderizada no caminho path="/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/'); // Levar até o caminho, usando o history.
    const text = getByText(/Encountered pokémons/i);
    expect(text).toBeInTheDocument();
  });

  test('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
    const { getAllByRole } = renderWithRouter(<App />); // Usar essa função para testar as rotas;
    const getLinks = getAllByRole('link'); // Pegar todos os links usando o Role, que pega o tipo do elemento.

    expect(getLinks[0].innerHTML).toBe('Home');
    expect(getLinks[1].innerHTML).toBe('About');
    expect(getLinks[2].innerHTML).toBe('Favorite Pokémons');
  });

  test('Teste se é redirecionada para a página inicial clicando na home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const getHomeLink = getByText(/Home/i); // Pegar o link Home e chegar o texto;
    fireEvent.click(getHomeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Teste se é redirecionada para a página About clicando na About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const getAboutLink = getByText(/About/i); // Pegar o link Home e chegar o texto;
    fireEvent.click(getAboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Teste se é redirecionada para a página /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const getFavoriteLink = getByText(/Favorite Pokémons/i); // Pegar o link Home e chegar o texto;
    fireEvent.click(getFavoriteLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se é redirecionada para pagina Not Found', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/pageNotFound');
    const textFound = /Pikachu crying because the page requested was not found/i;
    const getTextFound = getByAltText(textFound);
    expect(getTextFound).toBeInTheDocument();
  });
});
