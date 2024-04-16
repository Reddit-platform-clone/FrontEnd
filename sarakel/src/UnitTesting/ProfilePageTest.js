import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfilePage from './ProfilePage';

describe('ProfilePage Component', () => {
  test('renders ProfilePage component', () => {
    const { getByText } = render(<ProfilePage />);
    expect(getByText('Overview')).toBeInTheDocument();
  });

  test('changes active tab when clicked', () => {
    const { getByText, getByTestId } = render(<ProfilePage />);
    fireEvent.click(getByText('Posts'));
    expect(getByTestId('posts-tab')).toHaveClass('active');
  });

  test('renders content for Overview tab', () => {
    const { getByText } = render(<ProfilePage />);
    fireEvent.click(getByText('Overview'));
    expect(getByText('This is the Overview content.')).toBeInTheDocument();
  });

  test('renders content for Posts tab', () => {
    const { getByText } = render(<ProfilePage />);
    fireEvent.click(getByText('Posts'));
    expect(getByText('This is the Posts content.')).toBeInTheDocument();
  });

  test('renders content for Comments tab', () => {
    const { getByText } = render(<ProfilePage />);
    fireEvent.click(getByText('Comments'));
    expect(getByText('This is the Comments content.')).toBeInTheDocument();
  });

  // Add more tests for other functionalities as needed...
});
