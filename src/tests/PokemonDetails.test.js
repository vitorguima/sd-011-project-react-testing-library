import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('cria ambiente de testes', () => {
  let getByText;
  let queryByText;
  let getByRole;
  let getAllByAltText;
  let queryByAltText;
  let getByLabelText;
  let history;

  const firstPokemon = pokemons[0];
  const {
    id,
    name,
    summary,
    foundAt,
  } = firstPokemon;
  const firstPokemonPath = `/pokemons/${id}`;

  beforeEach(() => {
    ({ getByText,
      queryByText,
      getByRole,
      getAllByAltText,
      queryByAltText,
      getByLabelText,
      history,
    } = renderWithRouter(
      <App />,
    ));
  });

  beforeEach(() => { history.push(firstPokemonPath); });

  describe('Testa se as informações detalhadas são mostradas na tela', () => {
    it('verifica se o titulo da pagina é exibido corretamente', () => {
      const title = getByText(`${name} Details`);

      expect(title).toBeInTheDocument();
    });

    it('testa se o link "more details é suprimido"', () => {
      const detailsLink = queryByText('More details');

      expect(detailsLink).toBe(null);
    });

    it('testa se o heading sumary existe', () => {
      const headingSummary = getByRole('heading', { level: 2, name: 'Summary' });

      expect(headingSummary).toBeInTheDocument();
    });

    it('testa se é exibido um paragrafo com um resumo do pokemon', () => {
      const paragraphSummary = getByText(summary);

      expect(paragraphSummary).toBeInTheDocument();
      expect(paragraphSummary).toContainHTML(`<p>${summary}</p>`);
    });
  });

  describe('testes da seção de mapas', () => {
    it('testa se o heading da seção de mapas é exibido corretamente', () => {
      const mapsHeading = getByRole(
        'heading',
        {
          level: 2,
          name: `Game Locations of ${name}`,
        },
      );

      expect(mapsHeading).toBeInTheDocument();
    });

    it('testa se todas as localizações são exibidas corretamente', () => {
      foundAt.forEach(({ location, map }, index) => {
        const mapImage = getAllByAltText(`${name} location`);
        const locationName = getByText(location);

        expect(mapImage[index]).toHaveAttribute('src', map);
        expect(locationName).toBeInTheDocument();
      });
    });
  });

  describe('testes da seção de favoritar pokemons', () => {
    it('verifica se existe uma checkbox com a label correta', () => {
      const checkbox = getByLabelText('Pokémon favoritado?');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('testa se a checkbox adiciona e remove'
      + 'pokemons da lista de favoritos alternadamente', () => {
      const checkbox = getByLabelText('Pokémon favoritado?');
      let favoriteImage;
      if (!checkbox.checked) {
        favoriteImage = queryByAltText(`${name} is marked as favorite`);
        expect(favoriteImage).toBe(null);

        fireEvent.click(checkbox); // marca como favorito
      }

      favoriteImage = queryByAltText(`${name} is marked as favorite`);
      expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');

      fireEvent.click(checkbox); // desmarca como favorito

      favoriteImage = queryByAltText(`${name} is marked as favorite`);
      expect(favoriteImage).toBe(null);
    });
  });
});
