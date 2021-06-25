import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('teste do componente App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('teste do conjunto fixo de links de navegação', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const linkNavigation = getAllByRole('link');

    expect(linkNavigation[0].innerHTML).toBe('Home');
    expect(linkNavigation[1].innerHTML).toBe('About');
    expect(linkNavigation[2].innerHTML).toBe('Favorite Pokémons');
  });

  test('teste da barra de navegação ao clicar em Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('teste da barra de navegação ao clicar em About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('teste da barra de navegação ao clicar em Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('teste de caminho não existente e renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('pagina/que-nao-existe');
    const noMatch = getByText(/Not Found/i);

    expect(noMatch).toBeInTheDocument();
  });
});
