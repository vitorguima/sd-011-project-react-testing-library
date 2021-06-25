import React from 'react';
import renderWithRouter from '../services/helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getAllByRole } from '@testing-library/dom';

describe('Testando o componente <App.js />', () => {
  it('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {

    // Access the screen elements.
    const { getByText, history } = renderWithRouter(<App />);

    // Interact the elements if necessary.
    history.push('/');
    const encounteredPokemons = getByText(/Encountered pokémons/i);

    // Check if match
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação: Home, About e Favorite Pokémons', () => {

    // Access the screen elements.
      const { getByText, getAllByRole, history } = renderWithRouter(<App />);
      const Home = getByText(/Home/i);
      const About = getByText(/About/i);
      const BookedPokes = getByText(/Favorite Pokémons/i);
      const links = getAllByRole(/link/i);

    // Interact the elements if necessary.
      const firstLink = links[0];
      const secondLink = links[1];
      const thirdLink = links[2];

    // Check if match
    expect(firstLink).toHaveTextContent(/Home/i);
    expect(secondLink).toHaveTextContent(/About/i)
    expect(thirdLink).toHaveTextContent(/Favorite Pokémons/i)

  })

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
  
    // Access the screen elements.
    const { getByText, history } = renderWithRouter(<App />);
    const Home = getByText(/Home/i);
 
    // Interact the elements if necessary.
    userEvent.click(Home);
    const pathname = history.location.pathname;
 
    // Check if match
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página about, na URL /about ao clicar no link About da barra de navegação.', () => {
  
    // Access the screen elements.
    const { getByText, history } = renderWithRouter(<App />);
    const About = getByText(/About/i);
 
    // Interact the elements if necessary.
    userEvent.click(About);
    const pathname = history.location.pathname;
 
    // Check if match
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página Pokémons Favoritos, na URL /favorites ao clicar no link Favorite Pokémons da barra de navegação.', () => {
  
    // Access the screen elements.
    const { getByText, history } = renderWithRouter(<App />);
    const Favorites = getByText(/Favorite Pokémons/i);
 
    // Interact the elements if necessary.
    userEvent.click(Favorites);
    const pathname = history.location.pathname;
 
    // Check if match
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  
    // Access the screen elements.
    const { getByText, history } = renderWithRouter(<App />);
 
    // Interact the elements if necessary.
    history.push('/digimon/xablaumon');
    const notFound = getByText(/not found/i)
 
    // Check if match
    expect(notFound).toBeInTheDocument();
  });

})
