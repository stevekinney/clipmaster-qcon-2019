import React from 'react';
import ClippingContainer from '../Containers/ClippingContainer';

const Clippings = ({ ids }) => {
  console.log({ ids });
  return (
    <div className="clippings-list">
      {ids.map(id => (
        <ClippingContainer key={id} id={id} />
      ))}
    </div>
  );
};

export default Clippings;
