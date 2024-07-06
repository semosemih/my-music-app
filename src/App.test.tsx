import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ArtistStore } from './Stores/ArtistStore';

test('renders learn react link', () => {
  const store = new ArtistStore({ artists: [] });
  render(<App store={store} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
