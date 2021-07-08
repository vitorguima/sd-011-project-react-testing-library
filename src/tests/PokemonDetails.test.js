import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Se as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);

    const name = getByText(/Pikachu Details/i);
    const titleText = 'Summary';
    const heading = getByRole('heading', { level: 2, name: titleText });
    const detailsText = getByText(/This intelligent Pokémon/i);

    expect(name).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
    expect(detailsText).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('Se existe na página uma seção com os mapas contendo as localizações', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);

    const titleText = 'Game Locations of Pikachu';
    const heading = getByRole('heading', { level: 2, name: titleText });
    const firstLocation = getByText(/Kanto Viridian Forest/i);
    const secondLocation = getByText(/Kanto Power Plant/i);
    const altTexts = getAllByAltText(/pikachu location/i);
    const firstURL = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const secondURL = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();
    expect(altTexts.length).toBe(2);
    expect(altTexts[0].src).toBe(firstURL);
    expect(altTexts[1].src).toBe(secondURL);
  });

  it('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);

    const text = getByText('Pokémon favoritado?');
    const favoriteBtn = getByRole('checkbox');
    expect(favoriteBtn).not.toBeChecked();
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn).toBeChecked();
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn).not.toBeChecked();

    expect(favoriteBtn).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
