import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testando componente App - R1', () => {
  it('Verificando através o endereço da URL "/" ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Verifica a existência e ordem dos links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
  it('Verifica se ao clicar no Link Home, é direcionado para página inicial', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /Home/ });
    fireEvent.click(link);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  it('Verifica se ao clicar no Link About, é direcionado para página About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /About/ });
    fireEvent.click(link);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });
  it('Verifica se ao clicar no Link Favorite, é direcionado para Favoritos', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /Favorite/ });
    fireEvent.click(link);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
  it('Verifica se ao digitar um URL inválida, é direcionado para NotFound', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notFound');
    const heading = getByText(/Not found/i);
    expect(heading).toBeInTheDocument();
  });
});
