import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('testa a aplicação no elemento app.js', () => {
  it('Pokédex é renderizada ao carregar a aplicação no caminho de URL "/"', () => {
    const { getByTestId, history } = RenderWithRouter(<App />);
    history.push('/');
    const btn = getByTestId('next-pokemon');
    expect(btn).toBeInTheDocument();
  });
  it('contem links de navegação, home, about, favorites na pagina inicial', () => {
    const { getByRole } = RenderWithRouter(<App />);
    const nav = getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toContainHTML('Home', 'About', 'Favorite Pokémons');
  });
  it('renderiza a pagina home ao clicar em home`', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const Url = history.location.pathname;
    expect(Url).toBe('/');
  });
  it('renderiza a pagina about ao clicar em about', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const Url = history.location.pathname;
    expect(Url).toBe('/about');
  });
  it('renderiza a pagina Favorite Pokémons ao clicar Favorite Pokémons', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const Url = history.location.pathname;
    expect(Url).toBe('/favorites');
  });
  it('renderiza a pagina notfoud ao entrar em um link desconhecido', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    history.push('/Xablau/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
