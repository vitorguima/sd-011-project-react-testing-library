import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

it('Teste se a página principal renderizada ao carregar a aplicação no caminho de URL /',
  () => {
    const { history } = renderWithRouter(<App />);
    const home = history.location.pathname;
    expect(home).toBe('/');
  });

it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { queryAllByRole } = renderWithRouter(<App />);
  const nav = queryAllByRole('link');
  expect(nav[0].innerHTML).toBe('Home');
  expect(nav[1].innerHTML).toBe('About');
  expect(nav[2].innerHTML).toBe('Favorite Pokémons');
});

it('Teste se a aplicação é redirecionada para a página inicial ao clicar no link Home',
  () => {
    const { history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

it('Teste se a aplicação é redirecionada para a página de About, ao clicar no link About',
  () => {
    const { history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

it('Teste se a aplicação é direcionada para Not Found ao entrar em uma URL desconhecida',
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/not found/);
    expect(noMatch).toBeInTheDocument();
  });
