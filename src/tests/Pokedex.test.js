import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

const nameId = 'pokemon-name';

describe('teste do componente Pokedex', () => {
  it('testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const headingTitle = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(headingTitle).toBeInTheDocument();
  });

  it('testa se é exibido o próximo pokemon quando Próximo pokémon é clicado', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const button = getByRole('button', { name: /Próximo pokémon/ });
    const pokemonName = getByTestId(nameId).textContent;
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByTestId(nameId)).not.toHaveTextContent(pokemonName);
  });

  it('testa se pokémon é mostrado ao clicar no botão se estiver no ultimo', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const buttonType = getByRole('button', { name: /Fire/ });
    const pokemonType = getByTestId('pokemon-type');
    const button = getByRole('button', { name: /Próximo pokémon/ });

    fireEvent.click(buttonType);
    expect(pokemonType).toHaveTextContent(buttonType.textContent);

    const pokemonName = getByTestId(nameId).textContent;
    fireEvent.click(button);
    expect(getByTestId(nameId)).not.toHaveTextContent(pokemonName);
    fireEvent.click(button);
    expect(getByTestId(nameId)).toHaveTextContent(pokemonName);
  });

  it('testa se aparece um pokemon por vez', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);

    const buttonType = getByRole('button', { name: /Psychic/ });
    fireEvent.click(buttonType);
    const pokemonDetails = getAllByRole('link', { name: /More details/ });
    expect(pokemonDetails.length).toEqual(1);
  });

  it('testa se a Pokedex tem os botões de filtro', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const buttonType = getByRole('button', { name: /Psychic/ });
    fireEvent.click(buttonType);
    const pokemonType = getByTestId('pokemon-type');

    expect(pokemonType).toHaveTextContent(buttonType.textContent);
  });

  it('teste se a Pokedex tem um botão de resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const buttonAll = getByRole('button', { name: /All/ });
    expect(buttonAll).toBeInTheDocument();

    fireEvent.click(buttonAll);
    const pokemonName = getByTestId(nameId);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('testa, dinamicamente, um botão de filtro para cada pokemon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const buttonsType = getAllByTestId('pokemon-type-button');
    const dataType = data.reduce((acc, { type }) => {
      if (!acc.includes(type)) acc.push(type);
      return acc;
    }, []);

    expect(buttonsType).toHaveLength(dataType.length);
  });
});
