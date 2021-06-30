import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6 - componente Pokemon', () => {
  test('butão favoritar e imagem de estrela', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const buttonDetails = getByText('More details');
    fireEvent.click(buttonDetails);
    const buttonFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(buttonFavorite);
    const imgStar = getByAltText('Pikachu is marked as favorite');
    expect(imgStar).toBeInTheDocument();
    expect(imgStar.src).toContain('/star-icon.svg');
  });
  test('', () => {
    const { getByText, container, getByTestId, getByAltText } = renderWithRouter(<App />);
    const buttonDetails = getByText('More details');
    fireEvent.click(buttonDetails);
    const pokemon = container.querySelector('.pokemon-overview');
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeigth = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeigth).toBeInTheDocument();
    expect(pokemon).toBeInTheDocument();
    expect(pokemonWeigth.innerHTML).toMatch('Average weight: 6.0 kg');
    expect(pokemonName.innerHTML).toMatch('Pikachu');
    expect(pokemonType.innerHTML).toMatch('Electric');
  });
});
