import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditableText from '@/components/EditableText';

// Mock the Firebase logic
jest.mock('@/lib/firebase', () => ({
  db: {}
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe('EditableText Component', () => {
  it('renders default text when no value is provided', () => {
    render(<EditableText contentId="test-id" defaultText="Hello World" isAdmin={false} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders passed value instead of default text', () => {
    render(<EditableText contentId="test-id" defaultText="Hello World" value="Updated Title" isAdmin={false} />);
    expect(screen.getByText('Updated Title')).toBeInTheDocument();
  });

  it('does not allow editing if user is not admin', () => {
    render(<EditableText contentId="test-id" defaultText="Hello World" isAdmin={false} />);
    const spanElement = screen.getByText('Hello World');
    
    fireEvent.click(spanElement);
    
    // Check that contentEditable is false (not in editing mode)
    expect(spanElement).not.toHaveAttribute('contentEditable', 'true');
  });
});
