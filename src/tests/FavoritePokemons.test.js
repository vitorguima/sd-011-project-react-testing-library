import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('tests FavoritePokemons component', () => {
  test('test if there is a message on the screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const messageNegative = screen.getByText('No favorite pokemon found');

    expect(messageNegative).toBeInTheDocument();
  });

  test('Tests if all favorite cards are displayed', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const input = screen.getByLabelText('Pokémon favoritado?');

    expect(input).toBeInTheDocument();
    userEvent.click(input);
    history.push('/favorites');

    const Name = screen.getByTestId('pokemon-name');
    expect(Name).toBeInTheDocument();
  });
});
