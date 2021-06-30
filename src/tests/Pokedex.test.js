import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getAllByRole(/heading/)[1];
    const headingEncPokemons = getByText(/Encountered pokémons/);
    expect(headingEncPokemons).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    const { getByAltText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    // vê qual é o pokemon atual
    const pikachu = getByAltText(/Pikachu sprite/);
    expect(pikachu).toBeInTheDocument();
    // localiza o botão
    const linkElement = getByTestId(/next-pokemon/);
    // clica no mesmo
    fireEvent.click(linkElement);
    // verifica se o Pikachu foi substituido pelo Charmander
    const charmander = getByAltText(/Charmander sprite/);
    expect(charmander).toBeInTheDocument();
    // clica no mesmo
    fireEvent.click(linkElement);
    // verifica se o Pikachu foi substituido pelo Charmander
    const caterpie = getByAltText(/Caterpie sprite/);
    expect(caterpie).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    // vê se o pokemon atual é o pikachu
    const pikachu = getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
  });

  test('se a Pokédex tem os botões de filtro', () => {
    const { queryAllByTestId, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const buttons = queryAllByTestId(/pokemon-type-button/);
    const SEVEN = 7;
    expect(buttons.length).toBe(SEVEN);
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText(/All/);
    expect(allButton).toBeInTheDocument();
    expect(allButton).not.toBeDisabled();
  });

  test('se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const allTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    allTypes.forEach((type, index) => {
      const { queryAllByText } = renderWithRouter(<App />);
      const pokemonType = queryAllByText(`${type}`)[index];
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).not.toBeDisabled();
    });
  });

  test('se o botão de "Próximo" é desabilitado quando a lista tiver um pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/);
    // clica no mesmo
    fireEvent.click(normaltype);
    const nextPokemon = getByText(/Próximo pokémon/);
    expect(nextPokemon).toBeDisabled();
  });
});
