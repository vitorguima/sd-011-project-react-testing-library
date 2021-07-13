import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('<PokemonDetails.js /> component testing', () => {
  it('renders Pokémon`s detailed information', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const namePoke = getByText(/Pikachu Details/i);
    const summary = getByText(/summary/i);
    const paragraph = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
    expect(namePoke).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    // expect(getByText(/more details/i)).not.toBeInTheDocument();
  });
  it('Pokémon card contains link for Pokémon details', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    expect(getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();
    const img = getAllByAltText('Pikachu location');
    expect(img.length).toBeGreaterThan(0);
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('oiiii', () => {
    const { getByText, getByLabelText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const label = getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(label);
    expect(label).toBeChecked();
    fireEvent.click(label);
    expect(label).not.toBeChecked();
  });
});
