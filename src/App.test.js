import React from 'react';
import { render, act } from '@testing-library/react';
import App from './App';

test('renders App', async () => {
  const promise = Promise.resolve();
  const { getByText } = render(<App />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
  await act(() => promise);
});
