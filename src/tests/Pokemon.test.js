import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Test component <Pokedex.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRouter(<App />);
    const name = getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');
    const peso = getByText(/Average weight: 6.0 kg/i);
    expect(peso).toBeInTheDocument();
    const alt = getByAltText(/Pikachu/i);
    expect(alt).toBeInTheDocument();
    expect(alt.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Testa se o card do Pokémon indicado contém um link de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/More Details/i);
    expect(link).toBeInTheDocument();
  });
  test('Testa se ao clicar no link de navegação do Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/More Details/i);
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
  });
  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const link = getByText(/More Details/i);
    userEvent.click(link);
    const linkFavorite = getByText(/Pokémon favoritado ?/i);
    userEvent.click(linkFavorite);
    const star = getByAltText(/Pikachu is marked as favorite/i);
    expect(star.src).toContain('/star-icon.svg');
  });
});
