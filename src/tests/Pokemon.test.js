import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { container } = renderWithRouter(<App />);
    // O nome correto do Pokémon deve ser mostrado na tela;
    const anyPokemonCard = container.querySelector('.pokemon');
    expect(anyPokemonCard).toBeInTheDocument();

    const resultOfName = data.some((pokemon) => anyPokemonCard
      .firstChild
      .firstChild
      .textContent === pokemon.name);

    const resultOfType = data.some((pokemon) => anyPokemonCard
      .firstChild
      .firstChild
      .nextSibling
      .textContent === pokemon.type);

    const resultOfWeigth = data.some((pokemon) => anyPokemonCard
      .firstChild
      .firstChild
      .nextSibling
      .nextSibling
      .textContent === `Average weight: ${pokemon
      .averageWeight.value} ${pokemon
      .averageWeight.measurementUnit}`);

    const resultOfImage = data.some((pokemon) => anyPokemonCard
      .lastChild.src === pokemon.image
      && anyPokemonCard.lastChild.alt === `${pokemon.name} sprite`);

    expect(resultOfName).toBe(true);
    expect(resultOfType).toBe(true);
    expect(resultOfWeigth).toBe(true);
    expect(resultOfImage).toBe(true);
  });

  test('Verifica o link de navegação para exibir detalhes do Pokémon.', () => {
    // O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText('Próximo pokémon');

    data.forEach(({ id }) => {
      /** Para fazer o uso do .getAtribute() href de img, precisei pesquisar um tópico em StackOverFlor
       * Source: https://stackoverflow.com/questions/15439853/get-local-href-value-from-anchor-a-tag */

      const result = data.some((pokemon) => {
        const linkDetail = getByText('More details'); // 25
        expect(linkDetail.getAttribute('href')).toBe(`/pokemons/${id}`);
        return linkDetail.getAttribute('href') === `/pokemons/${pokemon.id}`;
      });
      expect(result).toBe(true);
      fireEvent.click(nextPokemon);
    });
  });

  test('Teste se é feito o direcionamento para a pág. de detalhes.', () => {
    const { getByText, getByTestId, getAllByRole, history } = renderWithRouter(<App />);

    const pokeName = getByTestId('pokemon-name'); // pikachu
    const linkDetail = getByText('More details'); // link detalhes
    fireEvent.click(linkDetail); // clica link

    /** Para fazer uso de levels em byRole, foi consultada a documentação oficial
     * do RTL.
     * Source: https://testing-library.com/docs/queries/byrole/#level */
    const pokeDetailsTitle = getAllByRole('heading', { level: 2 });

    expect(pokeDetailsTitle[0]).toBeInTheDocument();
    expect(pokeDetailsTitle[0].textContent).toBe(`${pokeName.textContent} Details`);

    const result = data.some(({ id }) => `/pokemons/${id}` === history.location.pathname);
    expect(result).toBe(true);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByTestId, history, container } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const pokemonName = getByTestId('pokemon-name');

    const favoriteCheckBox = getByText('Pokémon favoritado?');
    expect(favoriteCheckBox).toBeInTheDocument();
    fireEvent.click(favoriteCheckBox);

    const favoriteStar = container.querySelector('.favorite-icon');
    expect(favoriteStar.getAttribute('src')).toBe('/star-icon.svg');
    expect(favoriteStar.getAttribute('alt'))
      .toBe(`${pokemonName.textContent} is marked as favorite`);
  });
});
