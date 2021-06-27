import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

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

describe('Testa o componente App', () => {
  it('verifica os 3 links fixos no topo da página', () => {
    const { getByText } = RenderWithRouter(
      <App />,
    );
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    const about = getByText('About');
    expect(about).toBeInTheDocument();
    const favoritepokemons = getByText('Favorite Pokémons');
    expect(favoritepokemons).toBeInTheDocument();
  });

  it('Verifica se a aplicação é redirecionada para a página inicial', () => {
    const { getByText, history } = RenderWithRouter(
      <App />,
    );
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });
  it('Verifica se a aplicação é redirecionada para a página de About', () => {
    const { getByText, history } = RenderWithRouter(
      <App />,
    );
    const about = getByText('About');
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });
  it('Verifica se a app é redirecionada para a página de Pokémons Favoritados', () => {
    const { getByText, history } = RenderWithRouter(
      <App />,
    );
    const favPokemons = getByText('Favorite Pokémons');
    expect(favPokemons).toBeInTheDocument();
    fireEvent.click(favPokemons);
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });
  it('Verifica se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = RenderWithRouter(
      <App />,
    );
    history.push('/aleatorio');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
