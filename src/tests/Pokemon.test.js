import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

describe('Testa o requisito 06: ', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getAllByText, getByRole, getByTestId } = renderWithRouter(<App />);
    const image = getByRole('img');
    const type = getAllByText(/Electric/i);
    expect(getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(type[0]).toBeInTheDocument();
    expect(getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
    // Aparece o pokemon, seu nome, tipo, peso, e atributos da imagem.
  });

  test('Se o card tem um link à pagina de detalhes, e aparece o id no fim da URL', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const detailsBtn = getByRole('link', { name: 'More details' });
    expect(detailsBtn).toBeInTheDocument();

    fireEvent.click(detailsBtn);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
    // Pelo fim da url, se testa se aparece o id do Pikachu.
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole, getAllByRole, getByText } = renderWithRouter(<App />);

    expect(getByText(/Pikachu/i)).toBeInTheDocument();

    const moreDetailsBtn = getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsBtn);

    const favoriteCheckbox = getByRole('checkbox');
    fireEvent.click(favoriteCheckbox);

    const image = getAllByRole('img');
    /* Tem-se 4 imagens na tela, a da estrela é a posição 1. Nota-se com um simples console.log */
    expect(image[1].src).toContain('/star-icon.svg');
    expect(image[1].alt).toContain('Pikachu is marked as favorite');
  });
});
