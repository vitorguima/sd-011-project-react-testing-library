import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  it('se a página principal é renderizada ao carregar a aplicação no caminho /.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('Testa se o topo contém um conjunto fixo de links de navegação.', () => {
  it('O primeiro link deve possuir o texto Home.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O segundo link deve possuir o texto About.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});

describe('Teste se a aplicação é redirecionada para a página Not Found', () => {
  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Not Found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
