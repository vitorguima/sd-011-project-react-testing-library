import React from 'react';
import renderWithRouter from '../services/helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente <App.js />', () => {
  it('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {

    // Acessar os elementos da sua tela
    const { getByText, history } = renderWithRouter(<App />);
    const encounteredPokemons = getByText(/Encountered pokémons/i);

    // Interagir os elementos se tiver necessidade
    history.push('/');

    // Fazer a checagem
    expect(encounteredPokemons).toBeInTheDocument();
  });

})
