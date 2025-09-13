import React from 'react';

interface AccessProps {
  accessible?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const Access: React.FC<AccessProps> = ({
  accessible,
  fallback = null,
  children,
}) => {
  // 如果显式指定了accessible，则使用该值
  if (typeof accessible !== 'undefined') {
    return accessible ? <>{children}</> : <>{fallback}</>;
  }

  return <>{children}</>;
};

export default Access;