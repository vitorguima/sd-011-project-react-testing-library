import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o arquivo App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();
  });

  it('Verifica se tem o texto da Home page', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();
  });

  it('Verifica se tem 3 links no topo da página', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    const about = getByText('About');
    expect(about).toBeInTheDocument();
    const favorites = getByText('Favorite Pokémons');
    expect(favorites).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    const home = getByText('Home');
    fireEvent.click(home);
    const path = history.location.pathname;
    expect(path).toBe('/');
    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    const about = getByText('About');
    fireEvent.click(about);
    const path = history.location.pathname;
    expect(path).toBe('/about');
    const aboutPage = getByText(/About Pokédex/i);
    expect(aboutPage).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { getByText, history, getAllByText } = renderWithRouter(
      <App />,
    );
    const favorite = getByText('Favorite Pokémons');
    fireEvent.click(favorite);
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
    const favPage = getAllByText(/Favorite pokémons/i);
    expect(favPage[1]).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    history.push('/pag/aleatoria/aqui');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
