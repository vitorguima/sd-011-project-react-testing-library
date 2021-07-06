import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

// Lembrar de verificar o nome do colega que ajudou

describe('PokemonDetails tests', () => {
  it('Verifica se as informações do Pokémon selecionado são mostradas na tela', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);

    const nameDetail = getByText(/Pikachu Details/i);
    const titleText = 'Summary';
    const heading = getByRole('heading', { level: 2, name: titleText });
    const detailsText = getByText(/This intelligent Pokémon/i);

    expect(nameDetail).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
    expect(heading).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(detailsText).toBeInTheDocument();
  });

  it('Verifica se existe na página seção de mapas com as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    const text = 'Game Locations of Pikachu';
    const H2 = getByRole('heading', { level: 2, name: text });
    const fLocation = getByText(/Kanto Viridian Forest/i);
    const sLocation = getByText(/Kanto Power Plant/i);
    const altT = getAllByAltText(/pikachu location/i);
    const fUrl = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const sUrl = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(H2).toBeInTheDocument();
    expect(H2).toHaveTextContent(text);
    expect(sLocation).toBeInTheDocument();
    expect(fLocation).toBeInTheDocument();
    expect(altT.length).toBe(2);
    expect(altT[0].src).toBe(fUrl);
    expect(altT[1].src).toBe(sUrl);
  });

  it('Verifica o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText(/more details/i);

    fireEvent.click(details);
    const favoriteButton = getByRole('checkbox');
    const textFavorite = getByText('Pokémon favoritado?');

    expect(favoriteButton).not.toBeChecked();
    fireEvent.click(favoriteButton);
    expect(favoriteButton).toBeChecked();
    fireEvent.click(favoriteButton);
    expect(favoriteButton).not.toBeChecked();
    expect(favoriteButton).toBeInTheDocument();
    expect(textFavorite).toBeInTheDocument();
  });
});
