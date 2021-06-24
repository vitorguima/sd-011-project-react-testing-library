import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente App.js', () => {
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
});

describe('Teste se aplicação contém um conjunto fixo de links de navegação.', () => {
  it('Teste se o primeiro link deve possuir o texto home.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeAll = getByText(/Encountered pokémons/);
    expect(homeAll).toBeInTheDocument();
  });
  it('Teste se o segundo link deve possuir o texto Sobre.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutTitle = getByText(/About Pokédex/);
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se o terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const home = getByText(/Favorite Pokémons/);
    expect(home).toBeInTheDocument();
  });
  it('Teste redireciona-se a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/);
    expect(noMatch).toBeInTheDocument();
  });
});
