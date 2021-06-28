import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

const { name, foundAt } = data[0];

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More details/);
    fireEvent.click(detailsButton);
    expect(detailsButton).not.toBeInTheDocument();
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon roasts/)).toBeInTheDocument();
  });

  it('Testa se existe uma seção contendo as localizações do pokémon.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const detailsButton = getByText('More details');
    fireEvent.click(detailsButton);
    expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
    const pokemonLocations = container.querySelectorAll('img');
    expect(pokemonLocations[0]).toBeInTheDocument();
    expect(pokemonLocations[1]).toBeInTheDocument();
    expect(pokemonLocations[0].src).toContain(foundAt[0].map);
    expect(pokemonLocations[1].src).toContain(foundAt[1].map);
    expect(pokemonLocations[0].alt).toContain(foundAt[0].location);
    expect(pokemonLocations[1].alt).toContain(foundAt[1].location);
  });

  it('Testa se o usuário pode favoritar um pokémon na página de detalhes..', () => {
    const { getByText, getByLabelText, container } = renderWithRouter(<App />);
    const detailsButton = getByText('More details');
    fireEvent.click(detailsButton);
    expect(getByLabelText(/Pokémon favoritado?/)).toBeInTheDocument();
    const favoriteCheckbox = container.querySelector('input');
    expect(favoriteCheckbox).toBeInTheDocument();
    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeTruthy();
    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeFalsy();
  });
});
