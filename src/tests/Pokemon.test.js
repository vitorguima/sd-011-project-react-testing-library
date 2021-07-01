import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

function verifyCard(element, weight, poke, imageUrl) {
  const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
  const button = getByRole('button', { name: element });
  fireEvent.click(button);
  const pokemon = getByText(poke);
  const info = getByText(`Average weight: ${weight} kg`);
  const image = getByRole('img');
  const type = getByTestId('pokemon-type');

  expect(pokemon).toBeInTheDocument();
  expect(info).toBeInTheDocument();
  expect(image.alt).toContain(`${poke} sprite`);
  expect(image.src).toContain(imageUrl);
  expect(type.innerHTML).toBe(element);
}

describe('Teste o componente <Pokemon.js />',
  () => {
    it('Teste se é renderizdo um card cm as informações de pokémon Charmander',
      () => {
        verifyCard('Fire', '8.5', 'Charmander', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
      });

    it('Teste se é renderizado um card com as informações de determinado pokémon Pikachu',
      () => {
        verifyCard('Electric', '6.0', 'Pikachu', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      });

    it('Teste se é renderizado um card com as informações de determinado pokémon Snorlax',
      () => {
        verifyCard('Normal', '460.0', 'Snorlax', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
      });

    it('Teste se é renderizado um card cm as informações de determinado pokémon Alakazam',
      () => {
        verifyCard('Psychic', '48.0', 'Alakazam', 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
      });

    it('Teste se é renderizdo um card com a informações de determinado pokémon Dragonair',
      () => {
        verifyCard('Dragon', '16.5', 'Dragonair', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
      });

    it('Teste se é renderizado um card com as informações de determinado pokémon Ekans',
      () => {
        verifyCard('Poison', '6.9', 'Ekans', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
      });

    it('Teste se é renderizado um card com as informações de determinado pokmon Caterpie',
      () => {
        verifyCard('Bug', '2.9', 'Caterpie', 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
      });

    it('Teste se o card do Pokémon contém um link de navegação para exibir detalhes',
      () => {
        const { getByRole, history } = renderWithRouter(<App />);
        const link = getByRole('link', { name: /More details/i });
        expect(link).toBeInTheDocument();
        fireEvent.click(link);
        const URL = '/pokemons/25';
        expect(history.location.pathname).toBe(URL);
      });

    it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
      const { getByRole, getByAltText } = renderWithRouter(<App />);
      const details = getByRole('link', { name: /More details/i });
      fireEvent.click(details);

      const fav = getByRole('checkbox');
      fireEvent.click(fav);

      const image = getByAltText('Pikachu is marked as favorite');

      expect(image).toBeInTheDocument();
      expect(image.src).toContain('star-icon.svg');
    });
  });
