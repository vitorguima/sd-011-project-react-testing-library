import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('Testes referentes ao componente App', () => {
  const favoritePoks = 'Favorite Pokémons';

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
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText(favoritePoks)).toBeInTheDocument();
  });

  it('Verifica se o topo da aplicação contém links fixos de navegação', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText(favoritePoks)).toBeInTheDocument();
  });

  it('verifica se, ao clicar em "Home" a aplicação renderiza a página inicial', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const home = getByText('Home');

    fireEvent.click(home);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('verifica se, ao clicar em "About" a aplicação renderiza o componente sobre', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const about = getByText('About');

    fireEvent.click(about);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('verifica se, ao clicar nos favoritos o site renderiza os favoritos', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const favorite = getByText(favoritePoks);

    fireEvent.click(favorite);
    expect(getByText(favoritePoks)).toBeInTheDocument();
  });

  it('verifica se a página é redirecionada ao NotFound quando a url nao existe', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/xablau'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
