import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/jest-dom';
import axios from 'axios'; // Mock axios for API calls
import CreateCommunity from './CreateCommunity';

jest.mock('axios');

describe('CreateCommunity Component', () => {
  it('allows user to create a community', async () => {
    // Mock axios post function
    axios.post.mockResolvedValue({ data: 'Community created successfully' });

    const { getByText, getByPlaceholderText, getByLabelText } = render(<CreateCommunity />);

    // Simulate user interactions
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Test Community' } });
    fireEvent.click(getByLabelText('Public')); // Assuming 'Public' radio button
    fireEvent.click(getByText('18+ year old community')); // Click the checkbox

    fireEvent.click(getByText('create'));

    // Check if data is sent correctly
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/site_admin', {
        communityName: 'Test Community',
        type: 'public',
        isNSFW: true, // Assuming 'adult' is toggled
      }, expect.any(Object));
    });

    // Check if the success message is displayed
    expect(getByText('Community created successfully')).toBeInTheDocument();
  });
});