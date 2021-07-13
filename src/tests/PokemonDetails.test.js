import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const {
        getByText, getByRole, getByLabelText, getByAltText,
      } = renderWithRouter(<App />);
      const linkMoreDetails = getByText('More details');
      expect(linkMoreDetails).toBeInTheDocument();
      fireEvent.click(linkMoreDetails);
      const namePokemon = getByText(/Pikachu Details/i);
      const sumario = getByText(/Summary/i);
      const info = getByText(/This intelligent Pokémon roasts hard berries/i);
      expect(namePokemon).toBeInTheDocument();
      expect(sumario).toBeInTheDocument();
      expect(info).toBeInTheDocument();

      fireEvent.click(linkMoreDetails);
      const tagName = getByRole('heading', { name: /Game Locations of Pikachu/ });
      expect(tagName).toBeInTheDocument();
      expect(tagName).toHaveTextContent('Game Locations of Pikachu');

      fireEvent.click(linkMoreDetails);
      const label = getByLabelText(/Pokémon favoritado/i);
      fireEvent.click(label);
      const icone = getByAltText('Pikachu is marked as favorite');
      expect(icone).toBeInTheDocument();
      fireEvent.click(label);
      expect(icone).not.toBeInTheDocument();
    });
  test('Teste se existe na página os mapas contendo as localizações do pokémon',
    () => {
      const { getByText, getAllByAltText } = renderWithRouter(<App />);
      const linkMoreDetails = getByText('More details');
      expect(linkMoreDetails).toBeInTheDocument();
      fireEvent.click(linkMoreDetails);
      const imgLocation = getAllByAltText('Pikachu location');
      expect(imgLocation.length).toBeGreaterThan(0);
      expect(imgLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(imgLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    });
});
