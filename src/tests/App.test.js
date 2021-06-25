import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />, ['/']);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('renders the navigation menu links', () => {
  renderWithRouter(<App />, ['/']);

  const nav = screen.getByTestId('main-navigation');
  const links = nav.querySelectorAll('a');
  const expectedLinksLength = 3;

  expect(links.length).toBe(expectedLinksLength);
  expect(links[0].textContent).toBe('Home');
  expect(links[1].textContent).toBe('About');
  expect(links[2].textContent).toBe('Favorite Pokémons');
});

test('Verifica se a aplicação é redirecionada para a página inicial', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/i);
  fireEvent.click(linkHome);

  const urlHome = history.location.pathname;
  expect(urlHome).toBe('/');
});

test('Verifica se a aplicação é redirecionada para a página About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText(/About/i);
  fireEvent.click(linkAbout);

  const urlAbout = history.location.pathname;
  expect(urlAbout).toBe('/about');
});

test('Verifica se a aplicação é redirecionada para a página Pokémons Favoritados', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavorites = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavorites);

  const urlFavorites = history.location.pathname;
  expect(urlFavorites).toBe('/favorites');
});
