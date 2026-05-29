/**
 * Skeleton Loader Component
 * Loading placeholder for better UX
 */

import React from 'react';

export default function SkeletonLoader({ count = 1, type = 'card', className = '' }) {
  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`bg-secondary-100 dark:bg-secondary-800 rounded-lg h-64 animate-pulse ${className}`}
          />
        ))}
      </>
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="h-4 bg-secondary-100 dark:bg-secondary-800 rounded animate-pulse w-full" />
        <div className="h-4 bg-secondary-100 dark:bg-secondary-800 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-secondary-100 dark:bg-secondary-800 rounded animate-pulse w-4/6" />
      </div>
    );
  }

  if (type === 'avatar') {
    return <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-800 rounded-full animate-pulse" />;
  }

  if (type === 'button') {
    return <div className="h-10 bg-secondary-100 dark:bg-secondary-800 rounded-lg animate-pulse w-32" />;
  }

  return null;
}
