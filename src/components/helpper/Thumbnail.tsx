import React from 'react';
import './Thumbnail.css';

interface ThumbnailProps {
  name: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ name }) => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('');

  return (
    <div className="thumbnail">
      {initials.toUpperCase()}
    </div>
  );
};

export default Thumbnail;