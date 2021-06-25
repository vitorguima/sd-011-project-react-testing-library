import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente Pokemon Details', () => {
  it('Testando informações detalhadas do Pokemon selecionado', () => {
    const {
      getByText,
      getAllByRole,
      getByLabelText,
      getByAltText,
    } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    expect(getByText('Pikachu Details')).toBeInTheDocument();

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(heading).toBeInTheDocument();

    const details = screen.getByText(/This intelligent Pokémon/i);
    expect(details).toBeInTheDocument();

    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocations).toBeInTheDocument();

    const images = getAllByRole('img');
    expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].alt).toBe('Pikachu location');
    expect(images[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[2].alt).toBe('Pikachu location');

    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    const image = getByAltText('Pikachu is marked as favorite');
    expect(image.src).toContain('/star-icon.svg');
  });
});
