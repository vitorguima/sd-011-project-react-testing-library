import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tetstsa o componente App', () => {
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

  it('verifica se o primeiro link é `Home`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/Home/');
    const firstLink = getByText(/Home/i);
    expect(firstLink).toBeInTheDocument();
  });

  it('verifica se o segundo link é `About`', () => {
    const { getByText } = renderWithRouter(<App />);
    const secondLink = getByText(/About/i);
    expect(secondLink).toBeInTheDocument();
  });

  it('verifica se o terceiro link é `Favorite Pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);
    const thirdLink = getByText(/Favorite Pokémons/i);
    expect(thirdLink).toBeInTheDocument();
  });

  it('se a aplicação é direcionada para página inicial "/" ao clicar em Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/Home/');
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('se a aplicação é direcionada para página "/about" ao clicar em About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutAll = getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });

  it('ao clicar em "Favorite Pokemóns", a página é direcionada para favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteAll = getByText(/Favorite Pokémons/);
    expect(favoriteAll).toBeInTheDocument();
  });

  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
