import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
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

  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkElementHome = getByText(/Home/);
    const linkElementAbout = getByText(/About/);
    const linkElementFavPokemon = getByText(/Favorite Pokémons/);

    expect(linkElementHome).toBeInTheDocument();
    expect(linkElementAbout).toBeInTheDocument();
    expect(linkElementFavPokemon).toBeInTheDocument();
  });

  test('se é redirecionada para a página inicia ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkElementHome = getByText(/Home/);
    fireEvent.click(linkElementHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('se é redirecionada para a página inicia ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkElementAbout = getByText(/About/);
    fireEvent.click(linkElementAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('se é redirecionada para a página inicia ao clicar no link Pokémons Fav.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkElementAbout = getByText(/Favorite Pokémons/);
    fireEvent.click(linkElementAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/xablau')
    const noMatch = getByText(/Page requested not found/);
    expect(noMatch).toBeInTheDocument();
  });
});
