import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UsersProfile from '../UsersProfile';

// Mock the JSON data
jest.mock('../../mock.json', () => ({
  users: [
    {
      id: 1,
      name: 'Test User',
      image: 'test_image.png',
      LoggedIn: 0,
    },
    
  ],
}));

describe('UsersProfile component', () => {
  test('renders user profile correctly', () => {
    const { getByText, getByAltText } = render(<UsersProfile />);

    // Check if user name and avatar are rendered
    expect(getByText('Test User')).toBeInTheDocument();
    expect(getByAltText('User Avatar')).toBeInTheDocument();
  });

  test('toggles follow button correctly', () => {
    const { getByText } = render(<UsersProfile />);

    // Check if follow button initially displays "→ Follow"
    expect(getByText('→ Follow')).toBeInTheDocument();

    // Click on the follow button
    fireEvent.click(getByText('→ Follow'));

    // Check if follow button changes to "- Unfollow"
    expect(getByText('- Unfollow')).toBeInTheDocument();
  });

  
});
