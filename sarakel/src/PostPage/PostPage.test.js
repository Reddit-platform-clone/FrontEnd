import PostPage from './PostPage.js'
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the component to be tested
import PostPage from './PostPage';

// Mock axios and useParams
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ postId: '123' }), // Mock useParams to return postId
  useNavigate: jest.fn(),
}));

describe('PostPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders component with initial state', async () => {
    // Mock response data for axios calls
    const mockPostData = {
      post: [
        {
          communityId: 'community123',
          username: 'testuser',
          title: 'Test Post',
          content: 'This is a test post.',
          media: 'test.jpg',
          upvotes: 10,
          downvotes: 5,
          numberOfComments: 3,
        },
      ],
    };

    const mockCommInfo = {
      data: {
        data: {
          displayPicUrl: 'community_pic.jpg',
        },
      },
    };

    // Mock axios post and get methods
    jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({ data: mockPostData });
    jest.spyOn(require('axios'), 'get').mockResolvedValueOnce({ data: mockCommInfo });

    // Render the component
    render(<PostPage />);

    // Wait for component to load
    await waitFor(() => {
      // Assertions to check if elements are rendered with initial data
      expect(screen.getByText('community123')).toBeInTheDocument();
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByText('This is a test post.')).toBeInTheDocument();
      expect(screen.getByAltText('post media')).toHaveAttribute('src', 'test.jpg');
    });
  });

  test('sends comment on button click', async () => {
    // Render the component
    render(<PostPage />);

    // Mock axios post method for sending comment
    jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({});

    // Type a comment in the input field
    fireEvent.change(screen.getByPlaceholderText('Add a comment . . .'), {
      target: { value: 'This is a test comment.' },
    });

    // Click the send button
    fireEvent.click(screen.getByText('send'));

    // Wait for the comment to be sent
    await waitFor(() => {
      // Assertions to check if comment was sent
      expect(require('axios').post).toHaveBeenCalledWith(
        'http://localhost:5000/api/comment',
        { postID: '123', content: 'This is a test comment.' },
        { headers: { Authorization: 'Bearer null' } } // Mocked token value
      );

      // Check if input field is cleared after sending comment
      expect(screen.getByPlaceholderText('Add a comment . . .')).toHaveValue('');
    });
  });

  test('handles upvote button click', async () => {
    // Render the component
    render(<PostPage />);

    // Mock axios post method for voting
    jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({});

    // Click the upvote button
    fireEvent.click(screen.getByText('Upvote'));

    // Wait for vote to be processed
    await waitFor(() => {
      // Assertions to check if vote was sent with correct parameters
      expect(require('axios').post).toHaveBeenCalledWith(
        'http://localhost:5000/api/vote',
        { rank: 1, type: 'post', entityId: '123' },
        { headers: { Authorization: 'Bearer null' } } // Mocked token value
      );
    });
  });

  test('handles downvote button click', async () => {
    // Render the component
    render(<PostPage />);

    // Mock axios post method for voting
    jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({});

    // Click the downvote button
    fireEvent.click(screen.getByText('Downvote'));

    // Wait for vote to be processed
    await waitFor(() => {
      // Assertions to check if vote was sent with correct parameters
      expect(require('axios').post).toHaveBeenCalledWith(
        'http://localhost:5000/api/vote',
        { rank: -1, type: 'post', entityId: '123' },
        { headers: { Authorization: 'Bearer null' } }
      );
    });
  });

  test('displays replies when available', async () => {
    // Mock response data for getReplies API call
    const mockReplies = {
      message: [
        {
          _id: 'reply1',
          userID: 'user1',
          content: 'Reply 1',
          upvote: 5,
          downVote: 2,
          numberOfComments: 1,
        },
        {
          _id: 'reply2',
          userID: 'user2',
          content: 'Reply 2',
          upvote: 3,
          downVote: 1,
          numberOfComments: 0,
        },
      ],
    };

    // Mock axios post method for getting replies
    jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({ data: mockReplies });

    // Render the component
    render(<PostPage />);

    // Wait for replies to be displayed
    await waitFor(() => {
      // Assertions to check if replies are rendered
      expect(screen.getByText('Reply 1')).toBeInTheDocument();
      expect(screen.getByText('Reply 2')).toBeInTheDocument();
    });
  });

  test('handles authentication error', async () => {
    // Mock response for GetPostInfo when token is not available
    jest.spyOn(require('axios'), 'post').mockRejectedValueOnce(new Error('Unauthorized'));

    // Render the component
    render(<PostPage />);

    // Wait for error message to be displayed
    await waitFor(() => {
      // Assertions to check if error message is shown
      expect(screen.getByText('You need to Login first')).toBeInTheDocument();
    });
  });


});
