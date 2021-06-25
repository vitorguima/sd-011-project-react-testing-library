import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente App.js', () => {
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
    const home = getByRole('link', {
      name: /Home/i,
    });
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('O segundo link deve possuir o texto About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: /About/i,
    });
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favorite = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    fireEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Se a aplicação é direcionada Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/nao-encontrada/');
    const notFound = getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
