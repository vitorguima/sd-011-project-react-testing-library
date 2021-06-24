import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render /* fireEvent */ } from '@testing-library/react';
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

describe('Verifica se contém um conjunto fixo de links de navegação no topo.', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const textHome = getByText(/Home/i);
    fireEvent.click(textHome);
    const link = history.location.pathname;
    expect(link).toBe('/');
  });

  it('O segundo link deve possuir o texto About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const textAbout = getByText(/About/i);
    fireEvent.click(textAbout);
    const link = history.location.pathname;
    expect(link).toBe('/about');
  });

  it('O terceiro link deve possuir o texto Favorite Pokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favPokemons = getByText(/Favorite Pokémons/i);
    fireEvent.click(favPokemons);
    const link = history.location.pathname;
    expect(link).toBe('/favorites');
  });
});
