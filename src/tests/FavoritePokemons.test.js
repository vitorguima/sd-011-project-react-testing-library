import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('testando componente favorite pokémons', () => {
  it('testando "no fav poks"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <App />
      </MemoryRouter>,
    );
    const alert = getByText(/No favorite pokemon found/i);
    expect(alert).toBeInTheDocument();
  });

  it('testa se exibe todos os fav', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const detail = getByText(/More details/i);
    fireEvent.click(detail);
    const fav = getByText(/Pokémon favoritado\?/i);
    fireEvent.click(fav);
    const favLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favLink);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
