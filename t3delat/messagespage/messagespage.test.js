import { renderHook, act } from '@testing-library/react-hooks';
import Chats from './components/chats';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

describe('Chats Component Logic', () => {
  it('should handle state changes for toggles', () => {
    const { result } = renderHook(() => useChats());

    // Initial state for toggle
    expect(result.current.toggle).toBe(1);
    expect(result.current.toggle2).toBe(1);

    // Simulate changing toggle
    act(() => {
      result.current.toggleTab(2);
    });
    expect(result.current.toggle).toBe(2);

    // Simulate changing toggle2
    act(() => {
      result.current.toggleTab2(2);
    });
    expect(result.current.toggle2).toBe(2);
  });

  it('should fetch sent messages when toggle is 3', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useChats());

    // Change toggle to 3 to fetch sent messages
    act(() => {
      result.current.toggleTab(3);
    });

    await waitForNextUpdate();

    // Assuming getSentMessages is mocked and resolves to an array
    expect(result.current.sentMessages).toEqual(expect.any(Array));
  });

  it('should handle sending messages', async () => {
    const { result } = renderHook(() => useChats());
    const messageData = {
      recipient: 'testuser',
      title: 'Test Message',
      content: 'This is a test message'
    };

    // Mock sendMessage to resolve successfully
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Message sent successfully." })
      })
    );

    await act(async () => {
      await result.current.sendMessage(messageData.recipient, messageData.title, messageData.content);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  });

  test('renders the component', () => {
    const { getByText } = render(<Chats />);
    const sendButton = getByText('SEND');
    expect(sendButton).toBeInTheDocument();
  });

  test('switches tabs correctly', () => {
    const { getByText, getByTestId } = render(<Chats />);
    const inboxTab = getByText('Inbox');
    fireEvent.click(inboxTab);
    const inboxTabContent = getByTestId('inbox-tab-content');
    expect(inboxTabContent).toBeInTheDocument();
  });

  test('sends a message when send button is clicked', async () => {
    const { getByText, getByTestId } = render(<Chats />);
    const sendButton = getByText('SEND');
    fireEvent.click(sendButton);
    // Simulate inputting values in the textboxes
    const toBox = getByTestId('to-box');
    const subjectBox = getByTestId('subject-box');
    const messageBox = getByTestId('message-box');
    fireEvent.change(toBox, { target: { value: 'recipient' } });
    fireEvent.change(subjectBox, { target: { value: 'Test Subject' } });
    fireEvent.change(messageBox, { target: { value: 'Test Message' } });
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      fireEvent.click(sendButton);
    });
    // Assert that message sent successfully alert is shown
    expect(window.alert).toHaveBeenCalledWith('Message sent successfully.');
  });

  test('displays error when sending message fails', async () => {
    const { getByText, getByTestId } = render(<Chats />);
    const sendButton = getByText('SEND');
    fireEvent.click(sendButton);
    // Simulate inputting values in the textboxes
    const toBox = getByTestId('to-box');
    const subjectBox = getByTestId('subject-box');
    const messageBox = getByTestId('message-box');
    fireEvent.change(toBox, { target: { value: 'recipient' } });
    fireEvent.change(subjectBox, { target: { value: 'Test Subject' } });
    fireEvent.change(messageBox, { target: { value: 'Test Message' } });
    // Mock the fetch function to simulate a failed request
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => Promise.reject(new Error('Sending failed')));
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      fireEvent.click(sendButton);
    });
    // Assert that error alert is shown
    expect(window.alert).toHaveBeenCalledWith('Failed to send message: Sending failed');
  });

  test('renders the component', () => {
    const { getByText } = render(<Chats />);
    const sendButton = getByText('SEND');
    expect(sendButton).toBeInTheDocument();
  });

  // test('switches tabs correctly', () => {
  //   const { getByText, getByTestId } = render(<Chats />);
  //   const inboxTab = getByText('Inbox');
  //   fireEvent.click(inboxTab);
  //   const inboxTabContent = getByTestId('inbox-tab-content');
  //   expect(inboxTabContent).toBeInTheDocument();
  // });

  test('sends a message when send button is clicked', async () => {
    const { getByText, getByTestId } = render(<Chats />);
    const sendButton = getByText('SEND');
    fireEvent.click(sendButton);
    // Simulate inputting values in the textboxes
    const toBox = getByTestId('to-box');
    const subjectBox = getByTestId('subject-box');
    const messageBox = getByTestId('message-box');
    fireEvent.change(toBox, { target: { value: 'recipient' } });
    fireEvent.change(subjectBox, { target: { value: 'Test Subject' } });
    fireEvent.change(messageBox, { target: { value: 'Test Message' } });
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      fireEvent.click(sendButton);
    });
    // Assert that message sent successfully alert is shown
    expect(window.alert).toHaveBeenCalledWith('Message sent successfully.');
  });
});