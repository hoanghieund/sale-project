/**
 * EmptyStateMessage Component
 *
 * This component displays a customizable message with an optional icon
 * for empty states in the UI. It's designed to be reusable across the application.
 *
 * @param {object} props - The component props.
 * @param {string} props.icon - The icon to display (e.g., an emoji or an icon character).
 * @param {string} props.message - The message to display.
 * @returns {JSX.Element} A React functional component.
 */
import React from 'react';

interface EmptyStateMessageProps {
  icon: string;
  message: string;
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({ icon, message }) => {
  return (
    <div className="text-center text-gray-500 col-span-full py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default EmptyStateMessage;