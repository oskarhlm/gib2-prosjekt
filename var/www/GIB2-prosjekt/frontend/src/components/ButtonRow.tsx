import React, { Children } from 'react';

export const ButtonRow: React.FC = (props) => {
  const arrayChildren = Children.toArray(props.children);

  return (
    <div
      style={{
        width: 256,
        padding: 10,
        zIndex: 1000,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {arrayChildren.map((child, index) => (
        <div key={index} style={{ marginRight: '5px' }}>
          {child}
        </div>
      ))}
    </div>
  );
};
