import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className = '',
  icon 
}) => {
  const getVariantClasses = (variant) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'secondary':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'info':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'purple':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'orange':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'outline':
        return 'bg-transparent text-gray-600 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'md':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-3 py-1 text-sm';
      default:
        return 'px-2 py-1 text-xs';
    }
  };

  const baseClasses = `
    inline-flex items-center font-medium rounded-full border
    ${getVariantClasses(variant)} ${getSizeClasses(size)} ${className}
  `;

  return (
    <span className={baseClasses}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'success', 'warning', 'error', 
    'info', 'purple', 'orange', 'high', 'medium', 'low', 'completed', 'outline'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default Badge;