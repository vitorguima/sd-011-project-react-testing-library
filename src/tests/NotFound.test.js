import React from 'react';
import { renderWithRouter } from '../components';
import App from '../App';

describe('testing \'NotFound\' component', () => {
  it('tests if the page has the heading \'Page requested not found \'', () => {
    const { getByAltText, getByText, history } = renderWithRouter(<App />);

    history.push('/unkown/url');
    const { pathname } = history.location;
    expect(pathname).toBe('/unkown/url');

    const notFountMsg = getByText('Page requested not found');
    expect(notFountMsg).toBeInTheDocument();

    const imgSrc = getByAltText(/pikachu crying/i).src;
    expect(imgSrc).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
