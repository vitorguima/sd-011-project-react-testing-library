import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByRole('button', { name: 'Electric' }));

    const pokemonIMG = getByRole('img');

    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    expect(pokemonIMG.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonIMG.alt).toBe('Pikachu sprite');
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
  });
  it('Teste se o card do Pokémon contém um link para exibir detalhes dele', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: 'Electric' }));
    const detsOfPok = getByRole('link', { name: 'More details' });
    expect(detsOfPok).toBeInTheDocument();
    fireEvent.click(detsOfPok);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  /*   it('Teste se o link de navegação redireciona para a página de detalhes', () => {
        CONTEMPLADO NO TESTE ACIMA
  });
  it('Teste se a URL muda para /pokemon/<id>', () => {
        CONTEMPLADO NO TESTE ACIMA
  }); */
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);

    const typeOfPok = getByRole('button', { name: 'Poison' });
    expect(typeOfPok).toBeInTheDocument();
    fireEvent.click(typeOfPok);

    const moreDets = getByRole('link', { name: 'More details' });
    expect(moreDets).toBeInTheDocument();
    fireEvent.click(moreDets);

    const favCheck = getByRole('checkbox');
    expect(favCheck).toBeInTheDocument();
    fireEvent.click(favCheck);

    const img = getAllByRole('img');

    expect(img[1].src).toContain('star-icon.svg');
    expect(img[1].alt).toContain('Ekans is marked as favorite');
  });
});
