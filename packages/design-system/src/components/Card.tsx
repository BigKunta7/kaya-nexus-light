import React from 'react';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="border rounded-lg shadow-sm p-4 bg-white">
    {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
    <div>{children}</div>
  </div>
);

export default Card;
