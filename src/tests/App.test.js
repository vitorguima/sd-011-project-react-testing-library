import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { NotFound } from '../components';
import App from '../App';

describe('Requisito 1 - App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Se o topo da aplicação contém links de navegação', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('ao clicar no link Home, redireciona para página inicial .', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByText('Home');
    fireEvent.click(linkHome);
    expect(linkHome).toHaveAttribute('href', '/');
  });

  it('ao clicar no link About, redireciona para página About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = getByText('About');
    fireEvent.click(linkAbout);
    expect(linkAbout).toHaveAttribute('href', '/about');
  });

  it('ao clicar no link Favorites, redireciona para página favorites', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkFavorites = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorites);
    expect(linkFavorites).toHaveAttribute('href', '/favorites');
  });

  it('Ao entrar com URL desconhecida, redireciona para página Not Found', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
