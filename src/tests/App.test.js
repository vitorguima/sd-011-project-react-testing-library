import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Teste o componente <App.js />', () => {
  it('Teste se a página principal da Pokédex é renderizada na URL /.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const homeText = getByText(/Encountered pokémons/i);
    expect(homeText).toBeInTheDocument();
  });
  describe(
    'Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      it('O primeiro link deve possuir o texto Home', () => {
        const { getAllByRole } = renderWithRouter(<App />);
        const links = getAllByRole('link');
        expect(links[0].innerHTML).toBe('Home');
      });
      it('O segundo link deve possuir o texto About.', () => {
        const { getAllByRole } = renderWithRouter(<App />);
        const links = getAllByRole('link');
        expect(links[1].innerHTML).toBe('About');
      });
      it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
        const { getAllByRole } = renderWithRouter(<App />);
        const links = getAllByRole('link');
        expect(links[2].innerHTML).toBe('Favorite Pokémons');
      });
    },
  );
  it('Teste se a aplicação é redirecionada para a página inicial, ao clicar no link Home',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const homeLink = getByText(/Home/i);
      fireEvent.click(homeLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
      const homeText = getByText(/Encountered pokémons/i);
      expect(homeText).toBeInTheDocument();
    });
  it('Teste se a aplicação é redirecionada para a página About, ao clicar no link About',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const aboutLink = getByText(/About/i);
      fireEvent.click(aboutLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });
  it('Teste se a aplicação é redirecionada para Pokémons Favoritados, ao clicar no link',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const favoritesLink = getByText(/Favorite Pokémons/i);
      fireEvent.click(favoritesLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });
  it('Teste se a aplicação é redirecionada para a página Not Found',
    () => {
      const { getByAltText, history } = renderWithRouter(<App />);
      history.push('/pageNotFound');
      const regex = /Pikachu crying because the page requested was not found/i;
      const altImageNotFound = getByAltText(regex);
      expect(altImageNotFound).toBeInTheDocument();
    });
});
