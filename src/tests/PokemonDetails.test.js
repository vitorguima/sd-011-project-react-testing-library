import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Testing PokemonDetails component', () => {
  it('Test if page contains pokemons name details text', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  it('Test if doesn´t exists more details link', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('Test if exists a h2 with Summary text', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    let h2title = container.querySelectorAll('.pokemon-details > section > h2');
    h2title = h2title[0].innerHTML;
    expect(h2title).toBe('Summary');
  });

  it('Test if exists a paragraph', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    const pokemonDetails = container.querySelectorAll('.pokemon-details > section');
    const paragraph = pokemonDetails[0].querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.innerHTML).toBe(pokemons[0].summary);
  });

  it('Test if exists a h2 with Game Locations of pokemon name text', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    let h2title = container.querySelectorAll('.pokemon-details > section > h2');
    h2title = h2title[1].innerHTML;
    expect(h2title).toBe(`Game Locations of ${pokemons[0].name}`);
  });

  it('Test if exists a image of location', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    const image = getAllByAltText(`${pokemons[0].name} location`);
    expect(image[0]).toBeInTheDocument();
    expect(image[0].src).toBe(pokemons[0].foundAt[0].map);
  });

  it('Test if existis a label with Pokémon favoritado? text', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    const label = getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });

  it('Test if user can favorite pokemon', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    const favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const favoriteIcon = container.querySelector('.favorite-icon');
    expect(favoriteIcon).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
