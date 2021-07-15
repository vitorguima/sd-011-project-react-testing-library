import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const detail = 'More details';
const getPar = Data.map((sum) => sum.summary)[0];

describe('render test ', () => {
  test('Verifica se tem o Summary renderizado', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const details = getByText(detail);
    fireEvent.click(details);
    const About = container.querySelectorAll('h2')[1];
    expect(About.textContent).toBe('Summary');
  });

  test('Verifica se tem o paragrafor é renderizado', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const details = getByText(detail);
    fireEvent.click(details);
    const getPokemon = container.querySelectorAll('p')[3];
    expect(getPokemon.textContent).toBe(getPar);
  });

  test('Verifica se tem "Pokemon favorito?" e renderizado', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const details = getByText(detail);
    fireEvent.click(details);
    const Favorite = container.querySelector('label');

    expect(Favorite.textContent).toBe('Pokémon favoritado?');
  });

  test('Verifica se tem o Game Locations of<Name> renderizado', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const details = getByText(detail);
    fireEvent.click(details);
    const getAbout = container.querySelectorAll('h2')[2];
    expect(getAbout.textContent).toBe('Game Locations of Pikachu');
  });

  test('Verifica se details não é renderizado no pagina details', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);
    expect(details).not.toBeInTheDocument();
  });
});

describe('Test the <PokemonDetails.js /> component', () => {
  test('Verifica se tem o Pikachu Details renderizado', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const details = getByText(detail);
    fireEvent.click(details);
    const getAbout = container.querySelectorAll('h2')[0];
    expect(getAbout.textContent).toBe('Pikachu Details');
  });

  test('testando a locarização pokemon', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const details = getByText(detail);
    fireEvent.click(details);
    const imgPokemon = container.querySelectorAll('img');

    const altPokemon = 'Pikachu location';
    expect(imgPokemon[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgPokemon[1].alt).toBe(altPokemon);
    expect(imgPokemon[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgPokemon[2].alt).toBe(altPokemon);

    const kanto = 'Kanto Viridian Forest';
    const poder = 'Kanto Power Plant';
    expect(getByText(kanto)).toBeInTheDocument();
    expect(getByText(poder)).toBeInTheDocument();
  });
});
