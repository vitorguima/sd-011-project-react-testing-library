import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon ', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByTestId, getByAltText, history } = renderWithRouter(<App />);
    const buttonNormal = getByText(/Normal/);
    fireEvent.click(buttonNormal);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe('Snorlax');
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe('Normal');
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight.innerHTML).toBe('Average weight: 460.0 kg');
    const pokeImage = getByAltText('Snorlax sprite');
    expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
    const buttonD = getByText('More details');
    fireEvent.click(buttonD);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/143');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByRole, getByAltText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    const buttonHome = getByText('Home');
    fireEvent.click(buttonHome);
    const star = getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
