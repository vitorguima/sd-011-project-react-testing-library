import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

const [{ id, name, type, averageWeight, image }] = pokemons;
const { measurementUnit, value } = averageWeight;

const moreDetails = 'More details';

describe('É renderizado um card com as informações de determinado pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokeName = getByTestId('pokemon-name');

    expect(pokeName).toHaveTextContent(name);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokeType = getByTestId('pokemon-type');

    expect(pokeType).toHaveTextContent(type);
  });

  it('O peso médio do pokémon deve ser exibido corretamente', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokeWeight = getByTestId('pokemon-weight');

    expect(pokeWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
  });

  it('A imagem do Pokémon deve ser exibida com o `alt` correto', () => {
    renderWithRouter(<App />);
    const pokeImage = document.querySelector('img');
    expect(pokeImage.alt).toBe(`${name} sprite`);
    expect(pokeImage.src).toBe(image);
  });
});

describe('Testa o link de `More details` do pokemon', () => {
  it('Checa se possui o href correto', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(moreDetails));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Checa se redireciona para a página correta',
    () => {
      const { getByText } = renderWithRouter(<App />);

      const path = window.location.href;

      expect(getByText(moreDetails).href).toBe(`${path}pokemons/${id}`);
    });
});

describe('Testa o ícone de pokemons favoritos', () => {
  it('Deve exibir o ícone correto', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(moreDetails));
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    fireEvent.click(getByText('Home'));
    const favoriteIcon = document.querySelectorAll('img')[1];
    const imgPath = '/star-icon.svg';
    expect(favoriteIcon.src).toMatch(imgPath);
  });

  it('A imagem deve ter o atributo alt `*pokemon* is marked as favorite`', () => {
    renderWithRouter(<App />);
    const favoriteIcon = document.querySelectorAll('img')[1];
    expect(favoriteIcon).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
