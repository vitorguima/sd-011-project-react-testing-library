import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const textHome = getByRole('link', {
      name: /Home/i,
    });
    fireEvent.click(textHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('O primeiro link deve possuir o texto About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: /About/i,
    });
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('O primeiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favorites = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
