import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo pokémon ao clicar no botão "Próximo pokémon"', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText(/próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();
    pokemons.forEach((el) => {
      expect(getByText(el.name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText(/próximo pokémon/i);
    const dragonPokemon = getByText(/dragon/i);
    fireEvent.click(dragonPokemon);
    expect(nextPokemon).toBeDisabled();
    // const allPokemon = container.querySelectorAll('.pokemon');
    // console.log(allPokemon);
    // pokemons.forEach((el) => {
    //   expect(getByText(el.name)).toBeInTheDocument();
    //   if (allPokemon.length === 1) {
    //     expect(allPokemon.length).toBe(1);
    //     fireEvent.click(nextPokemon);
    //   }
    // });
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);

    const typesLenght = 7;
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(typesLenght);

    const buttonAll = getByRole('button', {
      name: /all/i,
    });
    const buttonElectric = getByRole('button', {
      name: /electric/i,
    });
    const buttonFire = getByRole('button', {
      name: /fire/i,
    });
    const buttonBug = getByRole('button', {
      name: /bug/i,
    });
    const buttonPoison = getByRole('button', {
      name: /poison/i,
    });
    const buttonPsychic = getByRole('button', {
      name: /psychic/i,
    });
    const buttonNormal = getByRole('button', {
      name: /normal/i,
    });
    const buttonDragon = getByRole('button', {
      name: /dragon/i,
    });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonElectric).toBeInTheDocument();
    expect(buttonFire).toBeInTheDocument();
    expect(buttonBug).toBeInTheDocument();
    expect(buttonPoison).toBeInTheDocument();
    expect(buttonPsychic).toBeInTheDocument();
    expect(buttonNormal).toBeInTheDocument();
    expect(buttonDragon).toBeInTheDocument();
  });
  it('Clicando em um botao, a Pokédex deve circular somente pelos pokémons daquele tipo;',
    () => {
      const { getByRole } = renderWithRouter(<App />);
      const buttonFire = getByRole('button', {
        name: /fire/i,
      });
      fireEvent.click(buttonFire);
      pokemons.filter((el) => el.type === 'Fire');
    });
  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const nextPokemon = getByText(/próximo pokémon/i);
    fireEvent.click(nextPokemon);
    const charmander = getByText(/charmander/i);

    expect(charmander).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', {
      name: /all/i,
    });
    const buttonFire = getByRole('button', {
      name: /fire/i,
    });

    fireEvent.click(buttonFire);
    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    fireEvent.click(buttonAll);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
