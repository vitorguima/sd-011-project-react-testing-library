import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pikachu = pokemons[0];
const moreDetailsText = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText(moreDetailsText);
    fireEvent.click(moreDetails);
    expect(getByText(`${pikachu.name} Details`)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = container.querySelectorAll('h2');
    expect(summary[1]).toBeInTheDocument();
    expect(summary[1].textContent).toBe('Summary');
    const resumo = container.querySelectorAll('p');
    const textResumo = 'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.';
    expect(resumo[3].textContent).toBe(textResumo);
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText(moreDetailsText);
    fireEvent.click(moreDetails);
    expect(getByText(`Game Locations of ${pikachu.name}`)).toBeInTheDocument();
    const allImages = [...container.querySelectorAll('img')];
    const locationsPokemon = pikachu.foundAt.map((location) => location);
    const allLocations = allImages
      .filter(({ alt }) => alt === `${pikachu.name} location`);
    const srcLocations = allLocations.map((location) => location.src);
    expect(locationsPokemon.every((location) => srcLocations.includes(location.map)))
      .toBeTruthy();
    expect(getByText(locationsPokemon[0].location)).toBeInTheDocument();
    expect(getByText(locationsPokemon[1].location)).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText(moreDetailsText);
    fireEvent.click(moreDetails);
    const checkbox = container.querySelector('input');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
    const labelCheckbox = container.querySelector('label');
    expect(labelCheckbox.textContent).toBe('Pokémon favoritado?');
  });
});
