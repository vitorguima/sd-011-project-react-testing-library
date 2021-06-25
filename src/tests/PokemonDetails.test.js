import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

const [{ id, name, summary, foundAt }] = pokemons;
const pokePath = `/pokemons/${id}`;

describe(
  'Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
  () => {
    it('Exibe o titulo da pagina corretamente', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push(pokePath);
      expect(getByText(`${name} Details`)).toBeInTheDocument();
    });

    it('Não deve existir o link de navegação para os detalhes', () => {
      const { queryByText, history } = renderWithRouter(<App />);
      history.push(pokePath);
      expect(queryByText('More details')).toBeNull();
    });

    it('A seção de detalhes deve conter um heading `Summary`', () => {
      const { queryByText, history } = renderWithRouter(<App />);
      history.push(pokePath);

      expect(queryByText('Summary')).toBeInTheDocument();
    });

    it('Deve conter um parágrafo com o resumo do Pokémon', () => {
      const { queryByText, history } = renderWithRouter(<App />);
      history.push(pokePath);

      expect(queryByText(summary)).toBeInTheDocument();
    });
  },
);

describe('A página mostra uma seção com localizações do Pokemon', () => {
  it('Titulo da seção `Game Locations of [nome do pokemon]` é exibido corretamente',
    () => {
      const { queryByText, history } = renderWithRouter(<App />);
      history.push(pokePath);

      expect(queryByText(`Game Locations of ${name}`)).toBeInTheDocument();
    });

  it('Todas as localizações do Pokémon são mostradas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokePath);

    const locations = document.querySelectorAll('.pokemon-habitat div');

    expect(locations).toHaveLength(foundAt.length);
  });

  it('Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização',
    () => {
      const { queryByText, history } = renderWithRouter(<App />);
      history.push(pokePath);

      foundAt.forEach(({ location, map }, index) => {
        const mapImage = document.querySelectorAll('.pokemon-habitat div img')[index];
        expect(mapImage).toHaveAttribute('src', map);

        expect(queryByText(location)).toBeInTheDocument();
      });
    });

  it('Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(pokePath);

      foundAt.forEach((_, index) => {
        const mapImage = document.querySelectorAll('.pokemon-habitat div img')[index];
        expect(mapImage).toHaveAttribute('alt', `${name} location`);
      });
    });
});

describe('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
  () => {
    it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      const { queryByRole, history } = renderWithRouter(<App />);
      history.push(pokePath);

      expect(queryByRole('checkbox')).toBeInTheDocument();
    });

    it(
      'Cliques no checkbox devem adicionar e remover o Pokémon da lista de favoritos',
      () => {
        const { queryByRole, queryByAltText, history } = renderWithRouter(<App />);
        history.push(pokePath);

        // Adiciona aos favoritos
        fireEvent.click(queryByRole('checkbox'));
        expect(queryByAltText(/marked as favorite/i)).toBeInTheDocument();

        // Remove dos favoritos
        fireEvent.click(queryByRole('checkbox'));
        expect(queryByAltText(/marked as favorite/i)).toBeNull();

        // Adiciona aos favoritos
        fireEvent.click(queryByRole('checkbox'));
        expect(queryByAltText(/marked as favorite/i)).toBeInTheDocument();

        // Remove dos favoritos
        fireEvent.click(queryByRole('checkbox'));
        expect(queryByAltText(/marked as favorite/i)).toBeNull();
      },
    );

    it('O label do checkbox deve conter o texto `Pokémon favoritado?`', () => {
      const { queryByLabelText, history } = renderWithRouter(<App />);
      history.push(pokePath);
      expect(queryByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
    });
  });
