import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWhithRouter from '../renderWithRouter';

describe('Requisito 01 teste App', () => {
  it('Deve mostrar o Pokédex quando a rota é `/', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Deve mostrar três links fixos de navegação quando a rota é `/', () => {
    const { getByText } = renderWhithRouter(<App />);
    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favoritePokemonsLink = getByText('Favorite Pokémons');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('Deve redenrizar a pagina Home após clicar', () => {
    const { getByText, history } = renderWhithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se a aplicação é redirecioda para a pagina About', () => {
    const { getByText, history } = renderWhithRouter(<App />);
    fireEvent.click(getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Deve redirecionar para a pagina de Pokémons Favoritados', () => {
    const { getByText, history } = renderWhithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Deve redirecionar para a pagina `Not Found`', () => {
    const { getByText, history } = renderWhithRouter(<App />);
    history.push('not-found');
    const noMatch = getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
