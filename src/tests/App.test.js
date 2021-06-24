import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../Renderwtihrouter';

describe('Teste do app.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Testa se o link com o texto Home, About e Favorite Pokémons está na tela ', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('Ao clicar em Home, renderiza a Url `/` ', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    fireEvent.click(home);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Ao clicar em About, renderiza a Url `/about` ', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    fireEvent.click(about);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Ao clicar em Favorite Pokémons, renderiza a Url `/favorites` ', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Verifica quando a Url é desconhecida, a pagina renderiza o Not Found', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/notFound'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
