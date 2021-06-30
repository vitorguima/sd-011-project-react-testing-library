import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Requisito 1', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Testando se há links de navegação na Home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
  });

  test('Testando o funcionamento do link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Testando o funcionamento do link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Testando o funcionamento do link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Testando o direcionamento para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
