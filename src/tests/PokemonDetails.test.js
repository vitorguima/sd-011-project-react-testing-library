import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('PokemonDetails tests', () => {
  const textDetails = 'more details';
  test('Tests if the selected Pokémons information is shown on the screen',
    () => {
      const { getByText, getByRole } = renderWithRouter(<App />);
      const moreDetails = getByText(textDetails);
      fireEvent.click(moreDetails);

      const pokeName = getByText('Pikachu Details');
      const textTitle = 'Summary';
      const heading = getByRole('heading', { level: 2, name: textTitle });
      const detailsText = getByText('This intelligent Pokémon');

      expect(pokeName).toBeInTheDocument();
      expect(heading).toHaveTextContent(textTitle);
      expect(heading).toBeInTheDocument();
      expect(moreDetails).not.toBeInTheDocument();
      expect(detailsText).toBeInTheDocument();
    });

  test('Tests if there is a section on the page with maps with pokemons locations',
    () => {
      const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
      const moreDetails = getByText(textDetails);
      fireEvent.click(moreDetails);
      const text = 'Game Locations of Pikachu';
      const textH2 = getByRole('heading', { level: 2, name: text });
      const location1 = getByText('Kanto Viridian Forest');
      const location2 = getByText('Kanto Power Plant');
      const altText = getAllByAltText('pikachu location');
      const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

      expect(textH2).toBeInTheDocument();
      expect(textH2).toHaveTextContent(text);
      expect(location2).toBeInTheDocument();
      expect(location1).toBeInTheDocument();
      expect(altText.length).toBe(2);
      expect(altText[0].src).toBe(url1);
      expect(altText[1].src).toBe(url2);
    });

  test('Tests if the user can bookmark a pokemon through the details page.',
    () => {
      const { getByText, getByRole } = renderWithRouter(<App />);
      const textDetails2 = getByText(textDetails);
      fireEvent.click(textDetails2);
      const favBtn = getByRole('checkbox');
      const favText = getByText('Pokémon favoritado?');
      expect(favBtn).not.toBeChecked();
      fireEvent.click(favBtn);
      expect(favBtn).toBeChecked();
      fireEvent.click(favBtn);
      expect(favBtn).not.toBeChecked();
      expect(favBtn).toBeInTheDocument();
      expect(favText).toBeInTheDocument();
    });
});
