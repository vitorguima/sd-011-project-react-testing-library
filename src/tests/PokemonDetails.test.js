import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

const pikachuDetails = '/pokemons/25';

describe('Testes do componente PokemonDetails', () => {
  describe('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    it('A página deve conter um texto "<name> Details".', () => {
      const { getByText } = renderWithRouter(<App />);
      const detailsLink = getByText(/More details/i);

      userEvent.click(detailsLink);

      const pageTitle = getByText(/Pikachu Details/i);
      expect(pageTitle.textContent).toBe('Pikachu Details');
    });

    it('Não deve existir o link de navegação para os detalhes do Pokémon', () => {
      const { getAllByRole, history } = renderWithRouter(<App />);
      history.push('/');
      const detailsLink = getAllByRole('link')[3];
      userEvent.click(detailsLink);

      expect(getAllByRole('link')[3]).toBeUndefined();
    });

    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { getAllByRole, history } = renderWithRouter(<App />);
      history.push(pikachuDetails);
      const summary = getAllByRole('heading')[2];

      expect(summary.textContent).toBe('Summary');
      expect(summary.localName).toBe('h2');
    });

    it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push(pikachuDetails);
      const paragraph = getByText(
        /This intelligent Pokémon roasts hard berries with electricity/i,
      );

      expect(paragraph.textContent).toBe(
        'This intelligent Pokémon roasts hard'
        + ' berries with electricity to make them tender enough to eat.',
      );
    });
  });

  describe('Teste se existe os mapas contendo as localizações do pokémon', () => {
    it('Em detalhes deve existir um h2 com o texto Game Locations of <name>', () => {
      const { getAllByRole, history } = renderWithRouter(<App />);
      history.push(pikachuDetails);

      const heading = getAllByRole('heading')[3];
      expect(heading.localName).toBe('h2');
      expect(heading.textContent).toBe('Game Locations of Pikachu');
    });

    it('Todas as localizações devem ser mostradas na seção de detalhes', () => {
      const { getAllByAltText, history } = renderWithRouter(<App />);
      const numberOfGameLocations = 4;
      history.push('/pokemons/10');

      const allLocations = getAllByAltText('Caterpie location');
      expect(allLocations.length).toBe(numberOfGameLocations);
    });

    it('Devem ser exibidos, o nome e uma imagem do mapa em cada localização', () => {
      const { getAllByAltText, getByText, history } = renderWithRouter(<App />);
      history.push('/pokemons/10');
      const image = getAllByAltText('Caterpie location')[0];
      const nameLocation = getByText(/Johto Route 30/i);

      expect(image).toBeInTheDocument();
      expect(nameLocation).toBeInTheDocument();
    });

    it('A imagem da localização deve ter um src com a URL da localização;', () => {
      const { getAllByAltText, history } = renderWithRouter(<App />);
      history.push(pikachuDetails);

      const image = getAllByAltText('Pikachu location')[0];
      expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(image.alt).toBe('Pikachu location');
    });
  });

  describe('Testa se pode favoritar um pokémon através da página de detalhes', () => {
    it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      const { getByLabelText, history } = renderWithRouter(<App />);
      history.push(pikachuDetails);

      const checkbox = getByLabelText('Pokémon favoritado?');
      expect(checkbox).toBeInTheDocument();
    });

    it('Cliques alternados no checkbox devem adicionar e remover dos favoritos;', () => {
      const { getByRole, getByAltText, history } = renderWithRouter(<App />);
      history.push(pikachuDetails);

      const checkbox = getByRole('checkbox');

      userEvent.click(checkbox);
      const favoritedIcon = getByAltText('Pikachu is marked as favorite');
      expect(favoritedIcon).toBeInTheDocument();

      userEvent.click(checkbox);
      expect(favoritedIcon).not.toBeInTheDocument();
    });

    it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      const { getByRole, history } = renderWithRouter(<App />);
      history.push(pikachuDetails);
      const checkbox = getByRole('checkbox');

      const labelText = checkbox.previousSibling.textContent;
      expect(labelText).toBe('Pokémon favoritado?');
    });
  });
});
