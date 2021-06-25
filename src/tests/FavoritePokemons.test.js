import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <FavoritePokemons/>', () => {
  it('Testa se aparece mensagem de aviso quando não há pokemons favoritos', () => {
    const { getByText } = renderWithRouter(<App />);
    const favPokemonsLink = getByText('Favorite Pokémons');

    userEvent.click(favPokemonsLink);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<App />);

    userEvent.click(getByText('Normal'));
    userEvent.click(getByText('More details'));
    userEvent.click(getByText('Pokémon favoritado?'));
    userEvent.click(getByText('Home'));
    userEvent.click(getByText('Poison'));
    userEvent.click(getByText('More details'));
    userEvent.click(getByText('Pokémon favoritado?'));
    userEvent.click(getByText('Favorite Pokémons'));

    expect(getByText('Snorlax')).toBeInTheDocument();
    expect(getByText('Ekans')).toBeInTheDocument();
  });
});
