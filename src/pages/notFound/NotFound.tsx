import React from 'react';
import './NotFound.css';

const NotFound: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className="not-found" {...props}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
