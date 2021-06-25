import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <App.js />', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se a página principal é renderizada ao carregar a app na URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });

  it('Verifica se na app contém links fixos para: Home, About e Favorite', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    const about = getByText('About');
    expect(about).toBeInTheDocument();
    const favorite = getByText('Favorite Pokémons');
    expect(favorite).toBeInTheDocument();
  });

  it('Verifica se é redirecionada para URL / ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    fireEvent.click(linkHome);
    const urlHome = history.location.pathname;
    expect(urlHome).toBe('/');
  });

  it('Verifica se é redirecionada para URL /about ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/i);
    fireEvent.click(linkAbout);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

  it('Verifica se é redirecionada para URL /favorites ao clicar no link Favorite', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(linkFavorites);
    const urlFavorites = history.location.pathname;
    expect(urlFavorites).toBe('/favorites');
  });

  it('Verifica se redireciona para Not Found ao entrar em uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
