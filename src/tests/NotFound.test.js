import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { NotFound } from '../components';

// Articles: https://github.com/testing-library/jest-dom#tohavetextcontent
// https://www.robinwieruch.de/react-testing-library
// https://stackoverflow.com/questions/63838716/react-testing-library-getbyroleheading-how-to-get-node-with-a-specific-headi

test('Teste 1: testa a rendereização do headling <h2>', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  // sintax => // getByRole('coisa da page (button, heading, etc...)', {name: 'oquetemnacoisadapage'}
  const headling = getByRole('heading',
    { name: /Page requested not found Crying emoji/i });

  expect(headling).toBeInTheDocument();
});

test('Test 2: testa a rendereização da imagem no headling <h2>', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);

  const imageAdress = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const image = getByAltText('Pikachu crying because the page requested was not found');

  expect(image).toHaveAttribute('src', imageAdress);
  expect(image).toBeInTheDocument();
});
