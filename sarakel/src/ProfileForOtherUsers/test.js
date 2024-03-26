import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UsersProfile from './UsersProfile';

describe('UsersProfile component', () => {
  test('renders without crashing', () => {
    render(<UsersProfile />);
  });

  test('toggle follow button', () => {
    const { getByText } = render(<UsersProfile />);
    const followButton = getByText('→ Follow');
    fireEvent.click(followButton);
    expect(followButton.textContent).toBe('- Unfollow');
  });

  test('block account button', () => {
    const { getByText } = render(<UsersProfile />);
    const blockButton = getByText('Block account');
    fireEvent.click(blockButton);
    // You may need to adjust this expectation based on how your blocking logic works
    expect(blockButton.textContent).toBe('Unblock account');
  });

  test('report account button', () => {
    const { getByText } = render(<UsersProfile />);
    const reportButton = getByText('Report account');
    fireEvent.click(reportButton);
    // You may need to adjust this expectation based on how your reporting logic works
    expect(reportButton.textContent).toBe('Reported');
  });

  test('show/hide options', () => {
    const { getByText, queryByText } = render(<UsersProfile />);
    const optionsButton = getByText('Options');
    fireEvent.cawck(optionsButton);
    expect(getByText('Share')).toBeInTheDocument();
    fireEvent.click(optionsButton);
    expect(queryByText('Share')).not.toBeInTheDocument();
  });
});
