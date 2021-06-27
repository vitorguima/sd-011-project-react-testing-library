import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
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

describe('Testando App.js', () => {
  it('Teste se a página principal da Pokédex é renderizada ao carregar "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const home = getByText(/Pokédex/i);
    expect(home).toBeInTheDocument();
  });

  it('Verifica a existência e ordem dos links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('deve renderizar o componente Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const goToHome = getByText(/Encountered pokémons/);
    expect(goToHome).toBeInTheDocument();
  });

  it('deve renderizar o componente About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutAll = getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });

  it('deve renderizar o componente Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/favorite/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const goToFavorite = getByText(/Favorite Pokémons/);
    expect(goToFavorite).toBeInTheDocument();
  });

  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/not-found');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
