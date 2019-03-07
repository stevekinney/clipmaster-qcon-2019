import React from 'react';
import { clipboard } from 'electron';

const Clipping = ({ content, id, remove }) => {
  return (
    <article className="clippings-list-item">
      <div className="clipping-text" disabled>
        {content}
      </div>
      <div className="clipping-controls">
        <button onClick={() => clipboard.writeText(content)}>
          → Clipboard
        </button>
        <button className="remove-clipping" onClick={remove}>
          Remove
        </button>
      </div>
    </article>
  );
};

export default Clipping;
