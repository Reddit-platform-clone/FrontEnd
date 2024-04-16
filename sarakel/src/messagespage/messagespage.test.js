import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chats from './Chats';

describe('Chats component', () => {
  test('renders all three tabs with correct content', () => {
    render(<Chats />);

    // Verify the presence of all three tabs
    const sendTab = screen.getByText('Send A Private Message');
    const inboxTab = screen.getByText('Inbox');
    const sentTab = screen.getByText('Sent');
    expect(sendTab).toBeInTheDocument();
    expect(inboxTab).toBeInTheDocument();
    expect(sentTab).toBeInTheDocument();

    // By default, the "Send A Private Message" tab should be active
    expect(sendTab).toHaveClass('active');
  });

  test('switches tabs when clicked', () => {
    render(<Chats />);

    // Verify initial tab state
    expect(screen.getByText('Send A Private Message')).toHaveClass('active');
    expect(screen.queryByText('Unread')).not.toBeInTheDocument();

    // Click on the "Inbox" tab
    userEvent.click(screen.getByText('Inbox'));

    // Verify tab switch
    expect(screen.queryByText('Send A Private Message')).not.toHaveClass('active');
    expect(screen.getByText('Inbox')).toHaveClass('active');

    // Click on the "Sent" tab
    userEvent.click(screen.getByText('Sent'));

    // Verify tab switch
    expect(screen.queryByText('Inbox')).not.toHaveClass('active');
    expect(screen.getByText('Sent')).toHaveClass('active');
  });

  test('sends a private message', async () => {
    render(<Chats />);

    // Click on the "Send A Private Message" tab
    userEvent.click(screen.getByText('Send A Private Message'));

    // Enter message details
    userEvent.type(screen.getByPlaceholderText('Recipient'), 'exampleUser');
    userEvent.type(screen.getByPlaceholderText('Subject'), 'Test Subject');
    userEvent.type(screen.getByPlaceholderText('Message'), 'Test Message');

    // Mock the fetch call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, message: 'Message sent successfully.' }),
      })
    );

   userEvent.click(screen.getByText('SEND'));

    await waitFor(() => expect(screen.getByText('Message sent successfully.')).toBeInTheDocument());
  });

});
