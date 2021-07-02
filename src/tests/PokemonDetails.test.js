import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderRouter from '../renderRouter';
import App from '../App';

// Requisito realizado com o suporte do Diego Figueiredo

describe('Teste do componente PokemonDetails.js', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
    // Acessar os elementos da tela
    const { getByText, getByRole } = renderRouter(<App />);
    const moreDetails = getByText(/more details/i);
    // Interagir com a aplicação
    fireEvent.click(moreDetails);

    const name = getByText(/Pikachu Details/i);
    const titleText = 'Summary';
    const heading = getByRole('heading', { level: 2, name: titleText });
    const detailsText = getByText(/This intelligent Pokémon/i);
    // Fazer os testes
    expect(name).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
    expect(detailsText).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('Teste se existe na página seção de mapas com as localizações do pokémon', () => {
    // Acessar os elementos da tela
    const { getByText, getByRole, getAllByAltText } = renderRouter(<App />);
    const moreDetails = getByText(/more details/i);
    // Interagir com a aplicação
    fireEvent.click(moreDetails);

    const text = 'Game Locations of Pikachu';
    const headingH2 = getByRole('heading', { level: 2, name: text });
    const firstLocation = getByText(/Kanto Viridian Forest/i);
    const secondLocation = getByText(/Kanto Power Plant/i);
    const altTexts = getAllByAltText(/pikachu location/i);
    const firstURL = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const secondURL = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    // Fazer os testes
    expect(headingH2).toBeInTheDocument();
    expect(headingH2).toHaveTextContent(text);
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();
    expect(altTexts.length).toBe(2);
    expect(altTexts[0].src).toBe(firstURL);
    expect(altTexts[1].src).toBe(secondURL);
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    // Acessar os elementos da tela
    const { getByText, getByRole } = renderRouter(<App />);
    const details = getByText(/more details/i);
    // Interagir com a aplicação
    fireEvent.click(details);
    // Acessar os elementos da tela
    const text = getByText('Pokémon favoritado?');
    const favoriteButton = getByRole('checkbox');
    // Fazer os testes
    expect(favoriteButton).not.toBeChecked();
    // Interagir com a aplicação
    fireEvent.click(favoriteButton);
    // Fazer os testes
    expect(favoriteButton).toBeChecked();
    // Interagir com a aplicação
    fireEvent.click(favoriteButton);
    // Fazer os testes
    expect(favoriteButton).not.toBeChecked();
    expect(favoriteButton).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
