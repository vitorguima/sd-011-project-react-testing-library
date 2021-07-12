import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Testando informações do Pokémon', () => {
    const { getByText, getAllByRole,
      getByLabelText, getByAltText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/more details/i));
    expect(getByText(/pikachu details/i)).toBeInTheDocument();

    const heading = getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(heading).toBeInTheDocument();

    const details = getByText(/this intelligent pokémon/i);
    expect(details).toBeInTheDocument();

    const gameLocations = getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(gameLocations).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].alt).toBe('Pikachu location');
    expect(images[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[2].alt).toBe('Pikachu location');

    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    const image = getByAltText(/pikachu is marked as favorite/i);
    expect(image.src).toContain('/star-icon.svg');
  });
});
