import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';
import Pokemon from '../components/Pokemon';

describe('testes do componente Pokemon.js', () => {
  test('teste as informações de um determinado pokemon', () => {
    const alakazam = pokemons[4];
    const { getByTestId, getByText, container } = renderWithRouter(
      <Pokemon pokemon={ alakazam } />,
    );
    const nameId = getByTestId('pokemon-name');
    expect(nameId.textContent).toBe('Alakazam');
    const typeId = getByTestId('pokemon-type');
    expect(typeId.textContent).toBe('Psychic');
    const { value, measurementUnit } = alakazam.averageWeight;
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    const img = container.querySelector('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
    expect(img.alt).toBe('Alakazam sprite');
  });

  test('teste se o card cotem link para mais detalhes', () => {
    const pikachu = pokemons[0];
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const pathName = history.location.pathname;
    expect(pathName).toBe(`/pokemons/${pikachu.id}`);
  });

  test('teste se existe um icone de estrela nos pokemons favoritados', () => {
    const pikachu = pokemons[0];
    const { getByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const checkFavorite = getByText(/Pokémon favoritado/i);
    fireEvent.click(checkFavorite);
    const starId = container.querySelectorAll('img');
    expect(starId[1].src).toContain('/star-icon.svg');
    expect(starId[1].alt).toBe(`${pikachu.name} is marked as favorite`);
  });
});
