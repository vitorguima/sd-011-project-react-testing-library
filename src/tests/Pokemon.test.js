import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon tests', () => {
  const pokemonOverview = '.pokemon-overview';
  const moreDetails = 'More details';
  test('test whether a card with the information for a particular Pokémon is rendered',
    () => {
      const { getByText, container } = renderWithRouter(<App />);
      const pokemonType = container.querySelector(pokemonOverview).firstChild.nextSibling;
      const moreDetailsBtn = getByText(moreDetails);
      fireEvent.click(moreDetailsBtn);

      const name = container.querySelector(pokemonOverview).firstChild;
      const img = container.querySelector('img');
      const weight = container.querySelector(pokemonOverview).lastChild;

      expect(name.textContent).toBe('Pikachu');
      expect(weight.textContent).toBe('Average weight: 6.0 kg');
      expect(pokemonType.textContent).toBe('Electric');
      expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(img.alt).toBe('Pikachu sprite');
    });

  test('Tests if the Pokémon card indicated in the Pokédex contains a navigation link',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const detailsBtn = getByText(moreDetails);

      fireEvent.click(detailsBtn);
      expect(history.location.pathname).toBe('/pokemons/25');
    });

  test('Tests if the Pokémon card indicated in the Pokédex contains a navigation link',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      const btnDetails = getByText(moreDetails);
      fireEvent.click(btnDetails);
      expect(history.location.pathname).toBe('/pokemons/25');
    });

  test('Tests if there is a star icon on favorite Pokemons',
    () => {
      const { getByText, container } = renderWithRouter(<App />);
      const detailsBtn = getByText(moreDetails);
      fireEvent.click(detailsBtn);

      let favImage = container.querySelector('.favorite-icon');
      expect(favImage).not.toBeInTheDocument();

      const favInput = getByText('Pokémon favoritado?');
      fireEvent.click(favInput);
      favImage = container.querySelector('.favorite-icon');
      expect(favImage).toBeInTheDocument();
      expect(favImage.src).toContain('/star-icon.svg');
      expect(favImage.alt).toBe('Pikachu is marked as favorite');
    });
});
