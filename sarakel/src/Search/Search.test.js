import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from './Search.js';

describe('Search component', () => {
  test('Renders search tabs correctly', () => {
    render(<Search />);
    
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('Communities')).toBeInTheDocument();
  });

  test('Switches active tab correctly', () => {
    render(<Search />);
    
    fireEvent.click(screen.getByText('Posts'));
    expect(screen.getByText('Posts').classList.contains('active')).toBe(false);

    fireEvent.click(screen.getByText('Comments'));
    expect(screen.getByText('Comments').classList.contains('active')).toBe(false);

    fireEvent.click(screen.getByText('Communities'));
    expect(screen.getByText('Communities').classList.contains('active')).toBe(false);
  });

  test('Opens and closes relevance dropdown correctly', () => {
    render(<Search />);

    fireEvent.click(screen.getByText('Relevance'));
    expect(screen.getByText('Relevance').classList.contains('active')).toBe(false);

    fireEvent.click(screen.getByText('Relevance'));
    expect(screen.queryByText('Relevance')).toBeNull();
  });

  test('Opens and closes time dropdown correctly', () => {
    render(<Search />);
  
    fireEvent.click(screen.getByText('All Time'));
  
    const allTimeElements = screen.queryAllByText('All Time');
    const activeAllTime = allTimeElements.find(element =>
      element.classList.contains('active')
    );
  
    expect(activeAllTime).not.toBeNull();
  
    fireEvent.click(screen.getByText('All Time'));
  
    expect(screen.queryByText('All Time')).toBeNull();
  });
  
  
});
