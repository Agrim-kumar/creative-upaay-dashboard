import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ 
  size = 'md', 
  src, 
  alt, 
  fallback, 
  className = '', 
  online = false,
  onClick 
}) => {
  const getSizeClasses = (size) => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-xs';
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'md':
        return 'w-10 h-10 text-base';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    rounded-full bg-gray-300 font-medium text-gray-700
    border-2 border-white shadow-sm overflow-hidden
    ${getSizeClasses(size)} ${className}
    ${onClick ? 'cursor-pointer hover:bg-gray-400 transition-colors' : ''}
  `;

  const renderFallback = () => {
    if (fallback) {
      return <span>{fallback}</span>;
    }
    
    if (alt) {
      const initials = alt
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
      return <span>{initials}</span>;
    }
    
    return <span>👤</span>;
  };

  return (
    <div className={baseClasses} onClick={onClick}>
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        renderFallback()
      )}
      
      {online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string,
  online: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Avatar;