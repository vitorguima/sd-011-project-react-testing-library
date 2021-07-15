import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Teste o componente <App.js />', () => {
  it('Se a página principal da Pokédex é renderizada ao carregar o caminho "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Redireciona para / ao clicar em Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Redireciona para /about ao clicar em About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Redireciona para /favorites ao clicar em Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorite = getByText('Favorite Pokémons');
    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Redireciona para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('eduardo-teixeira');
    const error = getByText(/Page requested not found/);
    expect(error).toBeInTheDocument();
  });
});
