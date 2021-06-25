import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente PokemonDetails - R7', () => {
  it('Verifica se as informações detalhadas são mostradas', () => {
    const { getByRole, getByText, queryByText } = renderWithRouter(<App />);
    const linkDet = getByRole('link', { name: /More details/i });
    fireEvent.click(linkDet);
    const nameDet = getByText(/Details/i);
    expect(nameDet.innerHTML).toBe('Pikachu Details');
    expect(queryByText(/More details/i)).not.toBeInTheDocument();
    const summary = getByRole('heading', { name: /Summary/i });
    expect(summary).toBeInTheDocument();
    const pikachuText = getByText(/This intelligent/i);
    expect(pikachuText).toBeInTheDocument();
  });
  it('Verifica se contém os mapas', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const linkDet = getByRole('link', { name: /More details/i });
    fireEvent.click(linkDet);
    const img = getAllByRole('img');
    expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1].alt).toBe('Pikachu location');
    expect(img[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(img[2].alt).toBe('Pikachu location');
  });
  it('Verifica se contém checkbox', () => {
    const { getByRole,
      getByLabelText, getAllByRole, getByText } = renderWithRouter(<App />);
    const linkDet = getByRole('link', { name: /More details/i });
    fireEvent.click(linkDet);
    const checkbox = getByLabelText(/Pokémon favoritado/i);
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    const img = getAllByRole('img');
    expect(img[1].src).toContain('star-icon.svg');
    expect(img[1].alt).toBe('Pikachu is marked as favorite');
    const locTitle = getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(locTitle).toBeInTheDocument();
    const linkFav = getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(linkFav);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
