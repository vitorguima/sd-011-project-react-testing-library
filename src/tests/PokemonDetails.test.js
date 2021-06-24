import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import pokemons from '../data';

const details = 'More details';

describe('Testando o componente <PokemonDetails.js />', () => {
  it('Verifica se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const caterpie = pokemons[2];
    const { name } = caterpie;
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Bug'));
    fireEvent.click(getByText(details));
    expect(getByText(`${name} Details`)).toBeInTheDocument();

    expect(screen.queryByText(details)).toBeNull();
    const summary = getByText('Summary');

    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('H2');

    const description1 = 'For protection, it releases a horrible stench from the';
    const description2 = ' antennae on its head to drive away enemies.';
    expect(getByText(description1 + description2)).toBeInTheDocument();
  });

  it('Uma seção com os mapas contendo as localizações do pokémon', () => {
    const caterpie = pokemons[2];
    const { name, foundAt } = caterpie;
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText('Bug'));
    fireEvent.click(getByText(details));

    const headingH2 = getByText(`Game Locations of ${name}`);
    expect(headingH2).toBeInTheDocument();
    expect(headingH2.tagName).toBe('H2');

    const allImages = getAllByRole('img').filter(
      (image) => image.alt === `${caterpie.name} location`,
    );

    foundAt.forEach(({ location, map }) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(allImages.map((image) => image.src)).toContain(map);
    });
  });

  it('Usuário pode favoritar um pokémon através da página de detalhes', () => {
    const caterpie = pokemons[2];
    const { id } = caterpie;
    const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Bug'));
    fireEvent.click(getByText('More details'));

    const favoriteCheck = getByRole('checkbox');
    expect(favoriteCheck).toBeInTheDocument();

    const localKey = 'favoritePokemonIds';

    fireEvent.click(favoriteCheck);
    expect(JSON.parse(localStorage.getItem(localKey).includes(id))).toBeTruthy();

    fireEvent.click(favoriteCheck);
    expect(JSON.parse(localStorage.getItem(localKey)).includes(id)).toBeFalsy();

    const label = getByLabelText('Pokémon favoritado?');
    fireEvent.click(label);
    expect(JSON.parse(localStorage.getItem(localKey)).includes(id)).toBeTruthy();
  });
});
