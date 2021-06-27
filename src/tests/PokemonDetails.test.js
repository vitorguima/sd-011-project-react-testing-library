import React from 'react';
import { fireEvent, getByAltText, getByRole } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { container, getByText } = renderWithRouter(<App />);
    const pokeCard = container.querySelector('.pokemon-overview');
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    // ===
    /** A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon; */
    const PokemonDetailTitle = getByText(`${pokeCard.firstChild.textContent} Details`);
    expect(PokemonDetailTitle).toBeInTheDocument();

    /** Não deve existir o link de navegação para os detalhes do Pokémon selecionado. */
    expect(moreDetails).not.toBeInTheDocument();

    /** A seção de detalhes deve conter um heading h2 com o texto Summary. */
    const headers = container.querySelectorAll('h2');
    expect(headers[1]).toHaveTextContent('Summary');

    /** A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado. */
    const sections = container.querySelectorAll('section');
    const paragraph = sections[1].lastChild.textContent;
    const pokeReturned = data.find((pokemon) => paragraph === pokemon.summary);
    expect(pokeCard.firstChild).toHaveTextContent(pokeReturned.name);
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    const { container, getByText, getAllByAltText } = renderWithRouter(<App />);
    const pokeCard = container.querySelector('.pokemon-overview');
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);

    /** A página deve conter um texto Game Locations of <name>, onde <name> é o nome do Pokémon; */
    const PokemonDetailTitle = getByText(`Game Locations of ${pokeCard.firstChild.textContent}`);
    expect(PokemonDetailTitle).toBeInTheDocument();

    /** Verifica a localização do Pokemon */
    const resultOfLocations = data.filter((pokemon) => pokemon.name === pokeCard.firstChild.textContent);
    expect(resultOfLocations[0].foundAt.length).toBeGreaterThan(0);

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const habitat = getAllByAltText(`${pokeCard.firstChild.textContent} location`); // arr poke location
    expect(habitat).toHaveLength(resultOfLocations[0].foundAt.length);

    resultOfLocations[0].foundAt.forEach((findAt, index) => {
      const anyLocation = getByText(findAt.location);
      expect(anyLocation).toBeInTheDocument();

      expect(habitat[index]).toBeInTheDocument();

      expect(habitat[index]).toHaveAttribute('alt', `${pokeCard.firstChild.textContent} location`);
      expect(habitat[index]).toHaveAttribute('src', findAt.map);
    });
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { container, getByText, getAllByAltText, getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    const favIcon = container.querySelector('.favorite-icon');
    expect(favIcon).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(favIcon).not.toBeInTheDocument();

    // const favoriteLabel = getByRole('label');
    expect(checkbox.parentNode).toHaveTextContent('Pokémon favoritado?');
  });
});
