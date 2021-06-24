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
  const heading = getByText(/Pokédex/);
  expect(heading).toBeInTheDocument();
});

it('Verificar se entra na página sobre e exibe o titulo', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const titlePage = getByText(/Encountered pokémons/i);
  expect(titlePage).toBeInTheDocument();

  const linkHome = getByText(/Home/i);
  fireEvent.click(linkHome);
  const url = history.location.pathname;
  expect(url).toBe('/');

  const linkAbout = getByText(/About/i);
  fireEvent.click(linkAbout);
  const urlAbout = history.location.pathname;
  expect(urlAbout).toBe('/about');

  const linkFavorites = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavorites);
  const urlFavorites = history.location.pathname;
  expect(urlFavorites).toBe('/favorites');
});
