import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
// import pokemon from '../data';

// const pokemons = [pokemon[0], pokemon[1]];

describe('Test FavoritePokemons component', () => {
  it('Checks if it shows No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', async () => {
    const { getByText,
      getByLabelText, getByAltText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25'); // more details
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });

  it('If NOT checked, no card is shown', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});

// await expect(userEvent.type(checkbox)).toBeChecked()
// fireEvent.change('input', { target: { value: 'checked' } });
