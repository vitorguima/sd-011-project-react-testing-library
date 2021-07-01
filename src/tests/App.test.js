import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

it('The page should render the home, About and Favorite Pokemons links.', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

it('render Home when clicked', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { location: { pathname } } = history;
  expect(pathname).toBe('/');
});

it('render About when clicked', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { location: { pathname } } = history;
  expect(pathname).toBe('/about');
});

it('render Favorite Pokémons when clicked', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const { location: { pathname } } = history;
  expect(pathname).toBe('/favorites');
});

it('render Not Found when the path doenst', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/notfound');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
