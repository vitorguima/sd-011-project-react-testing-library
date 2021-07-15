import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';
import App from '../App';
import Pokemon from '../components/Pokemon';

describe('test componet pokemon details', () => {
  test('test rendered information on Pokemon card', () => {
    const pokemonCard = Data[0];
    const { value, measurementUnit } = pokemonCard.averageWeight;
    const { getByText, container } = renderWithRouter(
      <Pokemon pokemon={ pokemonCard } isFavorite={ false } />,
    );
    expect(getByText(pokemonCard.name)).toBeInTheDocument();
    expect(getByText(pokemonCard.type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    const img = container.querySelector('img');

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('Pokemons url path test More Details', () => {
    const pikachu = Data[0];
    const { getAllByText, getByText, history } = renderWithRouter(<App />);
    const ButtonElectric = getAllByText('Electric')[1];
    fireEvent.click(ButtonElectric);

    const details = getByText(/More Details/i);
    fireEvent.click(details);

    const Url = history.location.pathname;
    expect(Url).toBe(`/pokemons/${pikachu.id}`);
  });

  test('test icon favorite', () => {
    const { container, getByText, getAllByText } = renderWithRouter(<App />);
    const ButtonElectric = getAllByText('Electric')[1];
    fireEvent.click(ButtonElectric);
    const details = getByText(/More Details/i);

    fireEvent.click(details);

    const favorites = container.querySelector('#favorite');
    fireEvent.click(favorites);
    const Icon = container.querySelector('.favorite-icon');
    expect(Icon).toBeInTheDocument();
    expect(Icon.alt).toBe('Pikachu is marked as favorite');
    expect(Icon.src).toContain('/star-icon.svg');
  });
});
