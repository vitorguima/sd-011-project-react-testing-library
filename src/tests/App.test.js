import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente App, Requisito 1', () => {
  it('Verifica se renderiza o texto "pokédex"', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página principal da Pokédex é renderizada ao carregar "/', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Testa se a página possui três botões de navegacão com o texto especifico', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');

    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('Verifica se a página é redirecionada ao inserir a rota "/', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/home/i);

    fireEvent.click(homeLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Verifica se a página é redirecionada ao inserir a rota "/about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);

    fireEvent.click(aboutLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('Verifica se a página é redirecionada ao inserir a rota "/favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favLink = getByText(/Favorite Pokémons/i);

    fireEvent.click(favLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se a página é redirecionada ao inserir uma rota inexistente', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/Inexistente');
    const text = /Pikachu crying because the page requested was not found/i;

    const pageText = getByAltText(text);
    expect(pageText).toBeInTheDocument();
  });
});
