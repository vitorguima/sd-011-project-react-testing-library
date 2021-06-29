import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Data from '../data';

test('Requisito 7 - Também funciona com Data.js modificado', () => {
  const { container, getByText, getByLabelText,
    getAllByAltText } = renderWithRouter(<App />);
  const nextBtn = getByText(/Próximo pokémon/);
  const detailsLink = getByText(/More details/);
  fireEvent.click(nextBtn);
  fireEvent.click(detailsLink);

  const h2Details = container.querySelectorAll('h2')[0].textContent;
  const h2Summary = container.querySelectorAll('h2')[1].textContent;
  const pSummary = container.querySelectorAll('p')[3].textContent;

  const h2DetailsData = Data.find((poke) => poke.name === h2Details.slice('0', '-8'));
  const pSummaryData = Data.find((pokemon) => pokemon.summary === pSummary);
  const h2LocationReg = new RegExp(`Game Locations of ${pSummaryData.name}`);
  const h2Location = getByText(h2LocationReg);

  expect(container.innerHTML).toMatch(h2DetailsData.name);
  expect(container.innerHTML).toMatch(pSummaryData.summary);
  expect(h2Location).toBeInTheDocument();

  expect(detailsLink).not.toBeInTheDocument();
  expect(h2Summary).toMatch(/^Summary$/);

  const { foundAt } = h2DetailsData;
  const img = getAllByAltText(`${h2DetailsData.name} location`);

  foundAt.forEach((item, index) => {
    const loc = item.location;
    expect(img[index].src).toBe(item.map);
    expect(container.innerHTML).toMatch(loc);
  });

  const favorCheck = getByLabelText('Pokémon favoritado?');
  expect(favorCheck).toBeInTheDocument();
});
