import React from 'react';

import renderWithMemory from '../renderWithMemory';
import App from '../App';

const initialEntries = { initialEntries: ['/not-exists'] };
let getByText;
let container;

beforeEach(() => {
  ({ getByText, container } = renderWithMemory(<App />, initialEntries));
});

test('Test title h2 with text not found', () => {
  const h2 = getByText(/Not Found/i);
  expect(h2.localName).toBe('h2');
  expect(h2).toHaveTextContent('Page requested not found 😭');
});

test('Test image', () => {
  const img = container.querySelector('img');
  expect(img).toContainHTML('<img class="not-found-image" src="https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif" alt="Pikachu crying because the page requested was not found">');
});
