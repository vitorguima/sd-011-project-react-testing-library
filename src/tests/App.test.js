import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste da aplicação toda', () => {
  it('Verifica se a página principal é renderizada na URL /', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Verifica se a página contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Verifica se redireciona para a URL / ao clicar no link Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });

  it('Verifica se redireciona para a URL /about, ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const about = getByText(/About Pokédex/);
    expect(about).toBeInTheDocument();
  });

  it('Verifica se redireciona para /favorites, ao clicar em Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favorites = getByText(/Favorite Pokémons/);
    expect(favorites).toBeInTheDocument();
  });

  it('Verifica se redireciona para a página Not Found com uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe/');
    const favorites = getByText(/Page requested not found/i);
    expect(favorites).toBeInTheDocument();
  });
});
