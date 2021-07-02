import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderRouter from '../renderRouter';
import App from '../App';

describe('Teste do componente App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    // Acessar os elementos da tela
    const { getByText } = renderRouter(<App />);
    const headingText = getByText(/Pokédex/i);
    // Fazer o teste
    expect(headingText).toBeInTheDocument();
  });

  it('Teste se a página principal da Pokédex é renderizada ao carregar a app', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderRouter(<App />);
    const urlPath = history.location.pathname;
    const foundPokemons = getByText('Encountered pokémons');
    // Fazer os testes
    expect(urlPath).toBe('/');
    expect(foundPokemons).toBeInTheDocument();
  });

  it('Teste se a app é redirec. p/ a page inicial na URL / ao clicar em Home', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderRouter(<App />);
    const home = getByText(/home/i);
    // Interagir com a aplicação
    fireEvent.click(home);
    const homeURL = history.location.pathname;
    // Fazer os testes
    expect(homeURL).toBe('/');
  });

  it('Teste se a app é redirec. p/ a page About na URL /about ao clicar em About', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderRouter(<App />);
    const about = getByText(/About/i);
    // Interagir com a aplicação
    fireEvent.click(about);
    const aboutURL = history.location.pathname;
    // Fazer os testes
    expect(aboutURL).toBe('/about');
  });

  it('Teste se a app é redirec. p/ a page Pokémons Favoritados na URL /favorites', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderRouter(<App />);
    const favorites = getByText(/favorite pokémons/i);
    // Interagir com a aplicação
    fireEvent.click(favorites);
    const pathName = history.location.pathname;
    // Fazer os testes
    expect(pathName).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página "Not Found"', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderRouter(<App />);
    // Interagir com a aplicação
    history.push('/pagina/que-nao-existe/');
    const notFoundMsg = getByText(/Page requested not found/i);
    // Fazer os testes
    expect(notFoundMsg).toBeInTheDocument();
  });
});
