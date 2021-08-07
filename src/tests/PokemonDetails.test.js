import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

const strDetails = 'More details';
const srtPikachu = 'Pikachu location';
const { summary } = data[0];

describe('Teste o componente <PokemonDetails.js />', () => {
  describe('Informações do Pokémon selecionado estão na tela', () => {
    test('A página deve conter um texto <name> Details', () => {
      const { getByText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const pokemonName = getByText('Pikachu Details');
      expect(pokemonName).toBeInTheDocument();
    });

    test('Não existe link de navegação para os detalhes do Pokémon selecionado', () => {
      const { getByText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      expect(moreDetailsLink).not.toBeInTheDocument();
    });

    test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { getAllByRole, getByText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const headingText = getAllByRole('heading', { level: 2 })[1];
      expect(headingText).toHaveTextContent('Summary');
    });

    test('Seção de detalhes contêm um parágrafo com o resumo do Pokémon', () => {
      const { getByText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const summaryPokemon = getByText(summary);
      expect(summaryPokemon).toBeInTheDocument();
    });
  });

  describe('Mostra todos os mapas contendo as localizações do pokémon', () => {
    test('Existe h2 com o texto Game Locations of <name>', () => {
      const { getByText, getAllByRole } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const pikachuGameLocation = getAllByRole('heading', { level: 2 })[2];
      expect(pikachuGameLocation).toBeInTheDocument();
      expect(pikachuGameLocation).toHaveTextContent('Game Locations of Pikachu');
    });

    test('Localizações do Pokémon são mostradas na seção de detalhes', () => {
      const { getByText, getAllByAltText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const pokemonImages = getAllByAltText(srtPikachu);
      expect(pokemonImages.length).toBe(2);
    });

    test('Exibi-se localização e mapa de cada localização', () => {
      const { getByText, getAllByAltText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const pokemonImages = getAllByAltText(srtPikachu);
      expect(pokemonImages.length).toBe(2);
      let pokemonNameAreas = getByText('Kanto Viridian Forest');
      expect(pokemonNameAreas).toBeInTheDocument();
      pokemonNameAreas = getByText('Kanto Power Plant');
      expect(pokemonNameAreas).toBeInTheDocument();
    });

    test('Imagem da localização possue atributo src com URL da localização', () => {
      const { getByText, getAllByAltText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const pokemonImage1 = getAllByAltText(srtPikachu)[0];
      expect(pokemonImage1.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      const pokemonImage2 = getAllByAltText(srtPikachu)[1];
      expect(pokemonImage2.src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    });

    test('Imagem da localização possue atributo alt com o texto <name> location', () => {
      const { getByText, getAllByAltText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const pokemonImages = getAllByAltText('Pikachu location');
      expect(pokemonImages.length).toBe(2);
    });
  });

  describe('Usuário pode favoritar pokémon', () => {
    test('Usuário pode favoritar pokémon', () => {
      const { getByText,
        getByRole,
        getByLabelText,
        getAllByAltText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText(strDetails);
      fireEvent.click(moreDetailsLink);
      const pokemonCheckBox = getByRole('checkbox');
      expect(pokemonCheckBox).toBeInTheDocument();
      const pokemonLabel = getByLabelText('Pokémon favoritado?');
      expect(pokemonLabel).toBeInTheDocument();
      expect(pokemonLabel.type).toBe('checkbox');
      // Testa se favorita e depois desfavorita
      fireEvent.click(pokemonCheckBox);
      const iconFavorite = getAllByAltText('Pikachu is marked as favorite')[0];
      expect(iconFavorite).toBeInTheDocument();
      fireEvent.click(pokemonCheckBox);
      expect(iconFavorite).not.toBeInTheDocument();
    });
  });
});
