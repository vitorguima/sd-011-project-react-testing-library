import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const stringMoreDetails = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  describe('Teste se é renderizado um card pokemon correto', () => {
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent('Pikachu');
    });

    test('O tipo correto do pokémon deve ser mostrado na tela', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const pokemonType = getByTestId('pokemon-type');
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent('Electric');
    });

    test('O peso médio do pokémon deve ser exibido corretamente', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const pokemonWeight = getByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    });

    test('A imagem do Pokémon deve ser exibida corretamente', () => {
      const { getByAltText } = renderWithRouter(<App />);
      const pokemonImage = getByAltText('Pikachu sprite');
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });
  });

  describe('Teste se o card do Pokémon contém o link de navegação correto', () => {
    test('Teste se o card do Pokémon contém o link de navegação correto', () => {
      const { getByText } = renderWithRouter(<App />);
      const pokemonLinkToDetails = getByText(stringMoreDetails);
      expect(pokemonLinkToDetails).toHaveAttribute('href', '/pokemons/25');
    });
  });

  describe('Redirecione para a página de detalhes corretamente', () => {
    test('Redirecione para a página de detalhes corretamente', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const pokemonLinkToDetails = getByText(stringMoreDetails);
      fireEvent.click(pokemonLinkToDetails);
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');
    });
  });

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
      const { getByText, getByAltText, getByRole } = renderWithRouter(<App />);
      const pokemonLinkToDetails = getByText(stringMoreDetails);
      fireEvent.click(pokemonLinkToDetails);

      const checkBoxPokemon = getByRole('checkbox');
      fireEvent.click(checkBoxPokemon);

      const iconFavorite = getByAltText('Pikachu is marked as favorite');
      expect(iconFavorite).toBeInTheDocument();
      expect(iconFavorite.src).toBe('http://localhost/star-icon.svg');
    });
  });
});
