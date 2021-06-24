import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testes do App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('teste página principal da Pokedex na rota /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
    const homeText = getByText(/Encountered pokémons/i);
    expect(homeText).toBeInTheDocument();
  });

  test('teste dos conjuntos fixos de links na Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteLink).toBeInTheDocument();
  });

  test('teste redirecionamento ao clickar nos links', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
    fireEvent.click(getByText(/About/i));
    const pathName2 = history.location.pathname;
    expect(pathName2).toBe('/about');
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathName3 = history.location.pathname;
    expect(pathName3).toBe('/favorites');
    history.push('/endereco-errado');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
