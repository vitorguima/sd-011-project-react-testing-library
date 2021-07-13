import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações do pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const namePokemon = getByTestId('pokemon-name');
    const typePokemon = getByTestId('pokemon-type');
    const weightPokemon = getByTestId('pokemon-weight');
    const imgPokemon = getByAltText('Pikachu sprite');

    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se o card contém o link detalhes do pokemon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    console.log(history);
    const linkMoreDetails = getByText('More details');
    expect(linkMoreDetails).toBeInTheDocument();
    fireEvent.click(linkMoreDetails);
    const url = '/pokemons/25';
    expect(history.location.pathname).toBe(url);
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByAltText, getByLabelText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(/More details/i);
    fireEvent.click(linkMoreDetails);
    const label = getByLabelText('Pokémon favoritado?');
    fireEvent.click(label);
    const favoritePokemon = getByAltText(/Pikachu is marked as favorite/i);
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
