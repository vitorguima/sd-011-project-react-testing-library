import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../Renderwithrouter';
import App from '../App';

describe('Teste do FavoritePokemons', () => {
  it('Testa se é exibido mensagem No Favorite pokemon found', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <App />
      </MemoryRouter>,
    );

    const msgError = getByText(/No favorite pokemon found/i);
    expect(msgError).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const moreDetails = getByRole('link', { name: /More details/i });
    fireEvent.click(moreDetails);
    const favorite = getByRole('checkbox');
    fireEvent.click(favorite);
    const pokFavorite = getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(pokFavorite);

    const averageWeight = getByText(/Average weight/i);
    expect(averageWeight).toBeInTheDocument();
  });
});
