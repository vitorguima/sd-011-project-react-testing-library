import React from 'react';
// import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 01: Teste o componente <App.js />', () => {
  it('Redireciona para a página inicial, ao clicar no link Home', () => {

  });

  it('Redireciona para a página de About, na URL /about.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    console.log(history);
    const title = screen.getByText(/About/);
    fireEvent.click(title);
    const url = history.location.pathname;
    expect(url).toBe('/about');
    const about = getByText(/About Pokedéx/i);
    expect(about).toBeInTheDocument();
  });

  it('Redireciona para a página de Favoritos ao clicar no link Favorite Pokémons', () => {

  });

  // it('deve testar um caminho não existente e a renderização do Not Found', () => {
  //   const { getByText, history } = renderWithRouter(<App />);
  //   history.push('/pagina/que-nao-existe/');
  //   const noMatch = getByText(/Página não encontrada/i);
  //   expect(noMatch).toBeInTheDocument();
  // });
});
