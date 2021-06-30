import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Teste dos componentes do <Pokedex.js/>',
  () => {
    it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
      const { getByRole } = renderWithRouter(<App />);
      const h2 = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
      expect(h2).toBeInTheDocument();
    });

    it('É exibido o próximo Pokémon da lista quando o botão Próximo é clicado', () => {
      const { getByTestId, getByAltText } = renderWithRouter(<App />);
      const button = getByTestId('next-pokemon');
      fireEvent.click(button);
      const charmander = getByAltText('Charmander sprite');
      expect(charmander).toBeInTheDocument();

      fireEvent.click(button);
      const caterpie = getByAltText('Caterpie sprite');
      expect(caterpie).toBeInTheDocument();

      fireEvent.click(button);
      const ekans = getByAltText('Ekans sprite');
      expect(ekans).toBeInTheDocument();

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      const pikachu = getByAltText('Pikachu sprite');
      expect(pikachu).toBeInTheDocument();
    });

    it('Teste se é mostrado apenas um Pokémon por vez', () => {
      const { getAllByTestId } = renderWithRouter(<App />);
      const pokemon = getAllByTestId('pokemon-name');
      expect(pokemon.length).toBe(1);
    });

    it('Teste se a Pokédex tem os botões de filtro', () => {
      function verrifyFilter(element) {
        const { getAllByRole, getAllByTestId } = renderWithRouter(<App />);
        const fireButton = getAllByRole('button', { name: element });
        fireEvent.click(fireButton[0]);
        const fireType = getAllByTestId('pokemon-type');
        expect(fireType[0].innerHTML).toBe(element);
      }
      verrifyFilter('Fire');
      verrifyFilter('Poison');
      verrifyFilter('Bug');
      verrifyFilter('Dragon');
      verrifyFilter('Psychic');
      verrifyFilter('Electric');
      verrifyFilter('Normal');
    });

    it('Teste se a Pokédex contém um botão para resetar o filtro',
      () => {
        const { getByText, getByAltText } = renderWithRouter(<App />);
        const allButton = getByText(/All/);
        fireEvent.click(allButton);
        const pikachu = getByAltText('Pikachu sprite');
        expect(pikachu).toBeInTheDocument();
        const nextButton = getByText(/Próximo pokémon/);
        fireEvent.click(nextButton);
        const charmander = getByAltText('Charmander sprite');
        expect(charmander).toBeInTheDocument();
      });
    it('Criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
      const { getAllByTestId } = renderWithRouter(<App />);
      const buttons = getAllByTestId('pokemon-type-button');
      const numOfButtons = 7;
      expect(buttons.length).toBe(numOfButtons);
    });
  });
