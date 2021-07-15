import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);
    const pikachuInfo = getByText('Pikachu Details');
    const h2Details = getByText('Summary');
    const pokemonInfo = getByText(/Pokémon roasts hard berries with electricity to/i);

    expect(detailsBtn).not.toBeInTheDocument();
    expect(pikachuInfo).toBeInTheDocument();
    expect(h2Details).toBeInTheDocument();
    expect(pokemonInfo).toBeInTheDocument();
  });
  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    const moreDets = getByText(/more details/i);
    fireEvent.click(moreDets);

    const h2Pok = getByText(/Game Locations of Pikachu/i);
    const pikachuLoc = getAllByAltText(/Pikachu location/i);

    expect(h2Pok).toBeInTheDocument();

    pikachuLoc.forEach((imageAltPikachu) => {
      expect(imageAltPikachu).toBeInTheDocument();
      expect(imageAltPikachu).toHaveAttribute('src');
      expect(imageAltPikachu.src.length).toBeGreaterThan(0);
    });
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const {
      getByText,
      getByLabelText,
      getByAltText,
    } = renderWithRouter(<App />);

    const moreDets = getByText(/more details/i);
    expect(moreDets).toBeInTheDocument();
    fireEvent.click(moreDets);
    const favArea = getByLabelText(/favoritado\?/i);
    fireEvent.click(favArea);
    const altFavArea = getByAltText(/favorite$/i);
    expect(altFavArea).toBeInTheDocument();
    fireEvent.click(favArea);
    expect(altFavArea).not.toBeInTheDocument();
  });
});
