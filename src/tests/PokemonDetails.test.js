import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const { summary } = pokemons[5];

describe('Checks Pokemon Details component', () => {
  it('Checks if it shows the detailed info of the selected pokemon', () => {
    const { getAllByTestId, container } = renderWithRouter(<App />);
    const typeButton = getAllByTestId(/pokemon-type/i);
    expect(typeButton[5]).toHaveTextContent('Psychic');
    userEvent.click(typeButton[5]);
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/ });
    const moreDetails = screen.getByText(/More details/i);
    userEvent.click(nextPokemonButton);
    userEvent.click(moreDetails);
    const heading = screen.getAllByRole('heading',
      { level: 2 });
    const paragraphs = container.querySelectorAll('p');
    console.log(paragraphs[3]);
    expect(heading[0]).toHaveTextContent(/Mew Details/i);
    expect(heading[1]).toHaveTextContent(/Summary/i);
    expect(paragraphs[3]).toHaveTextContent(summary);
    expect(heading[2]).toHaveTextContent(/Game Locations of Mew/i);
    expect(moreDetails).not.toBeInTheDocument();
  });
  it('Checks if it shows page location with maps and images', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    const img = screen.getAllByRole('img');
    expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
    expect(img[1].alt).toBe('Mew location');
  });

  it('Checks if the users can check their favorite pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    userEvent.click(screen.getByText('Pokémon favoritado?'));
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();
  });
});

/*
Teste se o usuário pode favoritar um pokémon através da página de detalhes.

A página deve exibir um checkbox que permite favoritar o Pokémon;

Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;

O label do checkbox deve conter o texto Pokémon favoritado?;

O que será verificado:

Será avaliado se o arquivo teste PokemonDetails.test.js contemplam 100% dos casos de uso criados pelo Stryker. */
