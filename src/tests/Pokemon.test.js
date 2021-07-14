import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('testes de renderização do card', () => {
  let getByText;
  let getByTestId;
  let getByAltText;
  const isFavorite = true;
  const showLink = true;
  const pokemonNameTestId = 'pokemon-name';
  const pokemonTypeTestId = 'pokemon-type';
  const pokemonWeightTestId = 'pokemon-weight';
  const firstPokemon = pokemons[0];

  beforeEach(() => {
    ({ getByText, getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ firstPokemon }
        showDetailsLink={ showLink }
        isFavorite={ isFavorite }
      />,
    ));
  });

  it('testa se o nome correto do pokemon é mostrado', () => {
    const currentName = firstPokemon.name;
    const displayedName = getByTestId(pokemonNameTestId);

    expect(displayedName).toBeInTheDocument();
    expect(displayedName).toContainHTML(currentName);
  });

  it('testa se o tipo do pokemon é mostrado corretamente', () => {
    const currentType = firstPokemon.type;
    const displayedType = getByTestId(pokemonTypeTestId);

    expect(displayedType).toBeInTheDocument();
    expect(displayedType).toContainHTML(currentType);
  });

  it('testa se o peso do pokemon é exibido corretamente', () => {
    const { averageWeight: { value, measurementUnit } } = firstPokemon;
    const currentWeight = `Average weight: ${value} ${measurementUnit}`;
    const displayedWeight = getByTestId(pokemonWeightTestId);

    expect(displayedWeight).toBeInTheDocument();
    expect(displayedWeight).toContainHTML(currentWeight);
  });

  it('testa se a imagem do pokemon é renderizada corretamente', () => {
    const { name, image } = firstPokemon;
    const displayedImage = getByAltText(`${name} sprite`);

    expect(displayedImage).toBeInTheDocument();
    expect(displayedImage).toHaveAttribute('src', image);
  });

  it('testa se é exibido a imagem de uma estrela em pokemons favoritados', () => {
    const { name } = firstPokemon;
    const displayedImage = getByAltText(`${name} is marked as favorite`);
    const imagePath = '/star-icon.svg';

    expect(displayedImage).toBeInTheDocument();
    expect(displayedImage).toHaveAttribute('src', imagePath);
  });

  it('testa se o card possui um link "More details"', () => {
    const link = getByText('More details');
    const { id } = firstPokemon;
    const linkPath = `/pokemons/${id}`;

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', linkPath);
  });
});

describe('testes de navegação do card', () => {
  let getByText;
  let history;

  const firstPokemon = pokemons[0];
  const { id, name } = firstPokemon;
  const detailsPath = `/pokemons/${id}`;

  beforeEach(() => {
    ({ getByText, history } = renderWithRouter(
      <App />,
    ));
  });

  it('testa se a página detalhes do pokemon é renderizada ao clicar no link', () => {
    const link = getByText('More details');

    fireEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe(detailsPath);

    const detailsHeader = getByText(`${name} Details`);

    expect(detailsHeader).toBeInTheDocument();
  });
});
