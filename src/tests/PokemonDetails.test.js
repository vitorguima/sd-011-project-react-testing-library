import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

const details = 'More details';

describe('Testes relativos ao componente "PokemonDetails"', () => {
  it('Verifica se as infos detalhadas do Pokémon são mostradas na tela', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const h2 = 'Summary';
    expect(getByText(details)).toBeInTheDocument();

    fireEvent.click(getByText(details));

    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(queryByText('More details')).toBeNull();
    expect(getByText(h2)).toBeInTheDocument();
    expect(queryByText(pokemons[0].summary)).toBeInTheDocument();
  });

  it('Verifica se existe na página os mapas e localização dos pokemons', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(details));
    const titleLocation = document.querySelectorAll('h2')[2];
    const pokemonLocation = document.querySelector('.pokemon-habitat');
    const imagesLocation = document.querySelectorAll('img');

    expect(titleLocation.innerHTML).toBe('Game Locations of Pikachu');
    expect(pokemonLocation.children.length).toBe(2);
    expect(imagesLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagesLocation[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imagesLocation[1].alt).toBe('Pikachu location');
    expect(imagesLocation[2].alt).toBe('Pikachu location');
  });

  it('Verifica se existe, dentro da página, a opção de favoritar o pokemon', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const favPokemon = 'Pokémon favoritado?';

    fireEvent.click(getByText(details));
    expect(getByText(favPokemon)).toBeInTheDocument();

    fireEvent.click(getByText(favPokemon));
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();

    fireEvent.click(getByText(favPokemon));

    const imagesInThePage = document.querySelectorAll('img');
    const magicNumber = 3;

    expect(imagesInThePage.length).toBe(magicNumber);
  });
});
