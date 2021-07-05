import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('teste do componente Pokemon Detail', () => {
  it('testa informações detalhdas do pokémon selecionado', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const linkDetail = getByRole('link', { name: /More details/ });
    fireEvent.click(linkDetail);

    const namePokemonDetail = getByText(/Pikachu Detail/);
    expect(namePokemonDetail).toBeInTheDocument();

    expect(linkDetail).not.toBeInTheDocument();

    const headingSummary = getByRole('heading', { level: 2, name: /Summary/ });
    expect(headingSummary).toBeInTheDocument();

    const summaryPikachu = getByText(/electricity/);
    expect(summaryPikachu).toBeInTheDocument();
  });

  it('testa mapas contendo informações do pokemon', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

    const linkDetail = getByRole('link', { name: /More details/ });
    fireEvent.click(linkDetail);

    const headingGameLocation = getByRole('heading', { level: 2,
      name: /Game Locations of Pikachu/ });
    expect(headingGameLocation).toBeInTheDocument();

    const location1 = getByText(/Kanto Viridian Forest/);
    const location2 = getByText(/Kanto Power Plant/);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    const image = getAllByRole('img');
    expect(image[1].alt).toBe('Pikachu location');
    expect(image[2].alt).toBe('Pikachu location');
    expect(image[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('testa se é possível favoritar da página de detalhes', () => {
    const { getByRole, getByAltText } = renderWithRouter(<App />);

    const linkDetail = getByRole('link', { name: /More details/ });
    fireEvent.click(linkDetail);

    const checkFavorite = getByRole('checkbox', { name: /Pokémon favoritado?/ });
    fireEvent.click(checkFavorite);

    const iconImage = getByAltText(/Pikachu is marked as favorite/);
    expect(iconImage).toBeInTheDocument();

    fireEvent.click(checkFavorite);
    expect(iconImage).not.toBeInTheDocument();
  });
});
