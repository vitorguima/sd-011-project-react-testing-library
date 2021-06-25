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

describe('Testando componente App', () => {
  it('Verifica o endereço da URL "/" ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Verifica a existência e ordem dos links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const link = getAllByRole('link');
    expect(link[0].innerHTML).toBe('Home');
    expect(link[1].innerHTML).toBe('About');
    expect(link[2].innerHTML).toBe('Favorite Pokémons');
  });
  it('Ao clicar no Link Home, é direcionado para página inicial', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /Home/ });
    fireEvent.click(link);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  it('Ao clicar no Link About é direcionado para página About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /About/ });
    fireEvent.click(link);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });
  it('Ao clicar no Favorite é direcionado para Favoritos', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /Favorite/ });
    fireEvent.click(link);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
  it('Ao digitar uma url errada vai para a pagina notFound', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notFound');
    const heading = getByText(/Not found/i);
    expect(heading).toBeInTheDocument();
  });
});
