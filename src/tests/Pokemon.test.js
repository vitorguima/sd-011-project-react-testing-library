import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('All tests of Pokemon', () => {
  test('este se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);

    const bugBtn = getByRole('button', { name: /Bug/i });
    const image = getByRole('img');
    const typePokemon = getByTestId('pokemon-type');

    fireEvent.click(bugBtn);

    expect(getByText('Caterpie')).toBeInTheDocument();
    expect(getByText('Average weight: 2.9 kg')).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
    expect(image.alt).toBe('Caterpie sprite');
    expect(typePokemon.innerHTML).toEqual('Bug');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém link de navegação', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const bugBtn = getByRole('button', { name: /Bug/i });
    const details = getByRole('link', { name: /more details/i });

    fireEvent.click(bugBtn);
    expect(details).toBeInTheDocument();

    fireEvent.click(details);
    expect(history.location.pathname).toEqual('/pokemons/10');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);

    const bugBtn = getByRole('button', { name: /Bug/i });

    fireEvent.click(bugBtn);
    const details = getByRole('link', { name: /more details/i });

    fireEvent.click(details);
    const favorite = getByRole('checkbox', { name: /Pokémon favoritado?/i });

    fireEvent.click(favorite);
    const image = getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toContain('Caterpie is marked as favorite');
  });
});
