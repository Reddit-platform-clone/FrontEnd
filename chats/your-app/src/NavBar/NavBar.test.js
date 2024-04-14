// NavBar.test.js

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  test('renders image buttons', () => {
    const { getByTestId } = render(
      <Router>
        <NavBar />
      </Router>
    );

    // Check if notification button is rendered
    const notificationButton = getByTestId('notification-button');
    expect(notificationButton).toBeInTheDocument();

    // Check if chat button is rendered
    const chatButton = getByTestId('chat-button');
    expect(chatButton).toBeInTheDocument();

    // Check if create button is rendered
    const createButton = getByTestId('create-button');
    expect(createButton).toBeInTheDocument();

    // Check if user avatar image is rendered
    const userAvatar = getByTestId('user-avatar');
    expect(userAvatar).toBeInTheDocument();
  });
});
