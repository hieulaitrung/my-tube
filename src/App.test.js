import React from 'react';
import { render, act } from '@testing-library/react';
import { UserContext } from './providers/UserProvider';
import Routes from './routes';

test('renders App', async () => {
  const promise = Promise.resolve();
  const { getByText } = render(
    <UserContext.Provider value={{ user: null, userLoading: false }}>
      <Routes />
    </UserContext.Provider>
  );
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
  await act(() => promise);
});
