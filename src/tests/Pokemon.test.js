import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokedata from '../data';

describe('Test if Pokémon component is properly rendered', () => {
  it('test is a card is rendered and contains specific pokemon informations', () => {
    const firstPokemon = pokedata[0];
    const { name, type, averageWeight: { value, measurementUnit} } = firstPokemon;
    const { container, getByText, getByTestId } = renderWithRouter(
      <Pokemon pokemon={ firstPokemon } />,
    );
    expect(getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(getByText(`Average weight: ${value} ${measurementUnit}`))
      .toBeInTheDocument();
    const image = container.querySelector('img');
    expect(image.alt).toBe('Pikachu sprite');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('test if page has a link for showing details', () => {
    const firstPokemon = pokedata[0];
    const { getByText, history } = renderWithRouter(<App />);
    const homePath = getByText(/Home/i);
    fireEvent.click(homePath);
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const historyPath = history.location.pathname;
    expect(historyPath).toBe(`/pokemons/${firstPokemon.id}`);
  });

  it('test if page renders a stars icon on favourite Pokemons.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const icon = container.querySelector('.favorite-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain('/star-icon.svg');
    expect(icon.alt).toBe('Pikachu is marked as favorite');
  });
});
