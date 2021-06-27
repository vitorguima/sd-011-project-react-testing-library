import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

describe('Testes do componente <Pokemon.js >', () => {
  describe('Testes relativos ao card do pokemon', () => {
    const moreDetailsString = 'More details';

    it('Testa se o nome correto do Pokémon é mostrado na tela', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const nextPokemonButton = getByTestId('next-pokemon');

      Data.forEach((pokemon) => {
        expect(pokemon.name).toBe(getByText(pokemon.name).innerHTML);
        userEvent.click(nextPokemonButton);
      });
    });

    it('Testa se o tipo correto do pokemon é mostrado na tela', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);

      const fireTypeFilter = getByText('Fire');
      const dragonTypeFilter = getByText('Bug');

      userEvent.click(fireTypeFilter);
      let pokemonType = getByTestId('pokemon-type');
      expect(pokemonType.innerHTML).toBe(fireTypeFilter.innerHTML);

      userEvent.click(dragonTypeFilter);
      pokemonType = getByTestId('pokemon-type');
      expect(pokemonType.innerHTML).toBe(dragonTypeFilter.innerHTML);
    });

    it('Testa se o peso médio do pokémon está escrito corretamente', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);

      const poisonTypeFilter = getByText('Poison');
      const ekansWeight = 'Average weight: 6.9 kg';
      const normalTypeFilter = getByText('Normal');
      const snorlaxWeight = 'Average weight: 460.0 kg';

      userEvent.click(poisonTypeFilter);
      let pokemonWeight = getByTestId('pokemon-weight');
      expect(pokemonWeight.innerHTML).toBe(ekansWeight);

      userEvent.click(normalTypeFilter);
      pokemonWeight = getByTestId('pokemon-weight');
      expect(pokemonWeight.innerHTML).toBe(snorlaxWeight);
    });

    it('Testa atributos da imagem do pokémon', () => {
      const { getByTestId } = renderWithRouter(<App />);

      const pokemonImage = getByTestId('pokemon-img');
      expect(pokemonImage).toBeInTheDocument();

      const pikachuImgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      expect(pokemonImage.src).toBe(pikachuImgSrc);
      expect(pokemonImage.alt).toBe('Pikachu sprite');
    });

    it('Testa se o card do pokémon contem um link "More details"', () => {
      const { getByText } = renderWithRouter(<App />);

      const detailsLink = getByText(moreDetailsString);
      expect(detailsLink).toBeInTheDocument();
      expect(detailsLink.href).toBe('http://localhost/pokemons/25');
    });

    it('Testa se é direcionado para a página de detalhes quando clicar no link', () => {
      const { getByText, history } = renderWithRouter(<App />);

      const homeUrl = history.location.pathname;
      expect(homeUrl).toBe('/');

      const detailsLink = getByText(moreDetailsString);
      userEvent.click(detailsLink);

      const url = history.location.pathname;
      expect(url).toBe('/pokemons/25');

      const title = getByText('Pikachu Details');
      expect(title).toBeInTheDocument();
    });

    it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
      const { getByText, container } = renderWithRouter(<App />);

      const bugTypeFilter = getByText('Bug');
      userEvent.click(bugTypeFilter);

      let favoriteIcon = container.querySelector('.favorite-icon');
      expect(favoriteIcon).not.toBeInTheDocument();

      const detailsLink = getByText(moreDetailsString);
      userEvent.click(detailsLink);

      const addPokemonToFavorites = getByText(/Pokémon favoritado?/i);
      userEvent.click(addPokemonToFavorites);

      favoriteIcon = container.querySelector('.favorite-icon');
      expect(favoriteIcon).toBeInTheDocument();
      expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
      expect(favoriteIcon.alt).toBe('Caterpie is marked as favorite');
    });
  });
});
