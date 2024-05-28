import React from 'react';

// Global type declarations for React components
declare global {
  type FC<T = object> = React.FunctionComponent<React.PropsWithChildren<T>>;
  type ComponentProps<T> = React.ComponentProps<T>;
}
