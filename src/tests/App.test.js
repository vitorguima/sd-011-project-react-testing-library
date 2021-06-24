import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes relativos ao arquivo App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  // Para conseguir testar a ordem dos links busquei ajuda neste fórum: https://stackoverflow.com/questions/61148880/how-to-check-elements-are-rendered-with-a-specific-sorting-with-react-testing-li
  it('Testa se a aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText, container } = renderWithRouter(<App />);

    const navLinks = container.querySelector('nav').children;
    const firstLink = getByText('Home');
    const secondLink = getByText('About');
    const thirdLink = getByText('Favorite Pokémons');

    // Testa se o primeiro link é o Home
    expect(navLinks.item(0)).toBe(firstLink);

    // Testa se o segundo link é o About
    expect(navLinks.item(1)).toBe(secondLink);

    // Testa se o terceiro link é o Favorite Pokémons
    expect(navLinks.item(2)).toBe(thirdLink);
  });

  it('Testa se a aplicação é direcionada à página inicial ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkHome = getByText('Home');
    fireEvent.click(linkHome);

    const url = history.location.pathname;
    expect(url).toBe('/');

    const title = getByText(/Encountered pokémons/);
    expect(title).toBeInTheDocument();
  });

  it('Testa se a aplicação é direcionada à página about ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkAbout = getByText('About');
    fireEvent.click(linkAbout);

    const url = history.location.pathname;
    expect(url).toBe('/about');

    const title = getByText(/About Pokédex/);
    expect(title).toBeInTheDocument();
  });

  it('Testa se a aplicação mostra a página NotFound ao acessar uma URL inválida', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const rotaErrada = '/makakoloko';
    history.push(rotaErrada);

    const errorMessage = getByText(/Page requested not found/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
