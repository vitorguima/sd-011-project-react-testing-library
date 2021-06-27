import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const pokemonTest = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon',
};

describe('Test pokemon component', () => {
  it('check name, type, weight and img of pokemon', () => {
    const pokemon = {
      id: 12,
      name: 'Pokebola',
      type: 'Bola',
      averageWeight: {
        value: '5.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    };
    const isFavorite = false;
    // acessar os elementos da tela
    const { getByTestId, getByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const checkName = getByText('Pokebola');
    expect(checkName).toBeInTheDocument();
    const checkType = getByText('Bola');
    expect(checkType).toBeInTheDocument();
    const checkWeight = getByTestId('pokemon-weight');
    expect(checkWeight).toHaveTextContent('Average weight: 5.0 kg');
    const getImage = getByAltText('Pokebola sprite');
    expect(getImage).toBeInTheDocument();
    expect(getImage.src).toBe(pokemon.image);
  });

  it('Check details link in pokemon card', () => {
    const pokemon = pokemonTest;
    const isFavorite = false;
    // acessar os elementos da tela
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const checkText = 'http://localhost/pokemons/25';
    const checkLinkBttn = getByText('More details');
    expect(checkLinkBttn).toBeInTheDocument();
    expect(checkLinkBttn.href).toBe(checkText);
  });

  it('Test if click in link details in pokemon card work correct', () => {
    // acessar os elementos da tela
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Test id URL', () => {
    // acessar os elementos da tela
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const getLinkUrl = getByText(/More details/);
    expect(getLinkUrl.href).toBe('http://localhost/pokemons/25');
    fireEvent.click(getByTestId('next-pokemon'));
    expect(getLinkUrl.href).toBe('http://localhost/pokemons/4');
    fireEvent.click(getByTestId('next-pokemon'));
    expect(getLinkUrl.href).toBe('http://localhost/pokemons/10');
  });

  it('Check favorite icon', () => {
    const pokemon = pokemonTest;
    const isFavorite = true;
    // acessar os elementos da tela
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const altText = 'Pikachu is marked as favorite';
    const getImg = getByAltText(altText);
    expect(getImg).toBeInTheDocument();
    expect(getImg.src).toBe('http://localhost/star-icon.svg');
  });
});
