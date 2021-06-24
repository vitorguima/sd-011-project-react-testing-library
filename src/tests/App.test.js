import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1 - Testa o componente <App.js />', () => {
  it('renderiza um reading com o texto `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Testa se contém os links de navegação (Home, About, Favorite Pokémons).', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: 'Home' });
    const linkAbout = getByRole('link', { name: 'About' });
    const linkFavoritePokemon = getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });

  it('Testa o redirecionamento para as paginas ao clicar nos links de navegacao',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      const homeButton = getByText('Home');
      const aboutButton = getByText('About');
      const favoriteButton = getByText('Favorite Pokémons');
      expect(homeButton).toBeInTheDocument();
      expect(aboutButton).toBeInTheDocument();
      expect(favoriteButton).toBeInTheDocument();

      fireEvent.click(homeButton);
      expect(history.location.pathname).toBe('/');
      fireEvent.click(aboutButton);
      expect(history.location.pathname).toBe('/about');
      fireEvent.click(favoriteButton);
      expect(history.location.pathname).toBe('/favorites');
      history.push('/path/random');
      expect(getByText(/Page requested not found/i)).toBeInTheDocument();
    });
});
