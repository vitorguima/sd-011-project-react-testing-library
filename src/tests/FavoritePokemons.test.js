import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js', () => {
  test('É exibido na tela uma mensagem, caso não haja pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noMensage = screen.getByText('No favorite pokemon found');

    expect(noMensage).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const targetPokemonOne = '/pokemons/4'; // Charmander
    const targetPokemonTwo = '/pokemons/65'; // Alakazam
    const targetPokemonThree = '/pokemons/148'; // Dragonair
    const goToFavorites = '/favorites';

    history.push(targetPokemonOne);
    const checkedToFavorite = getByText('Pokémon favoritado?');
    userEvent.click(checkedToFavorite);

    history.push(targetPokemonTwo);
    userEvent.click(checkedToFavorite);

    history.push(targetPokemonThree);
    userEvent.click(checkedToFavorite);

    history.push(goToFavorites);

    const pokemonOne = getByText('Charmander');
    const pokemonTwo = getByText('Alakazam');

    expect(pokemonOne).toBeInTheDocument();
    expect(pokemonTwo).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokémon é exibido, se não estiver favoritado', () => {
    const { queryByText } = renderWithRouter(<App />);
    const pikachu = queryByText('pikachu');

    expect(pikachu).not.toBeInTheDocument();
  });
});
