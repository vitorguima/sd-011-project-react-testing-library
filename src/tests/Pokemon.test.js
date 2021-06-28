import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByTestId('pokemon-type').textContent).toBe('Electric');
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
    expect(getByRole('img').src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Psychic'));
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    expect(getByAltText(/is marked as favorite/).src).toContain('star-icon.svg');
    expect(getByAltText(/is marked as favorite/).alt).toContain('Alakazam');
    expect(getByAltText(/sprite/).alt).toContain('Alakazam');
  });
});
