import { clipboard } from 'electron';
import React, { Component } from 'react';
import { render } from 'react-dom';

class Application extends Component {
  state = {
    newClipping: '',
    clippings: [],
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const clipping = {
      id: Date.now(),
      content: this.state.newClipping,
    };
    const clippings = [...this.state.clippings, clipping];
    this.setState({
      clippings,
      newClipping: '',
    });
  };

  addClipping = () => {
    const clipping = {
      id: Date.now(),
      content: clipboard.readText(),
    };
    const clippings = [...this.state.clippings, clipping];
    this.setState({
      clippings,
      newClipping: '',
    });
  };

  handleRemove = id => {
    const survivingClippings = this.state.clippings.filter(c => c.id !== id);
    this.setState({
      clippings: survivingClippings,
    });
  };

  render() {
    const { newClipping, clippings } = this.state;
    return (
      <section className="content">
        <CopyFromClipboard onCopy={this.addClipping} />
        <form className="new-clipping" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="new-clipping-content"
            placeholder="New Clipping"
            value={newClipping}
            name="newClipping"
            onChange={this.handleChange}
          />
        </form>
        <div className="clippings-list">
          {clippings.map(clipping => {
            return (
              <Clipping
                key={clipping.id}
                clipping={clipping}
                onRemove={this.handleRemove}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

const Clipping = ({ clipping, onRemove }) => {
  return (
    <article className="clippings-list-item" key={clipping.id}>
      <div className="clipping-text" disabled>
        {clipping.content}
      </div>
      <div className="clipping-controls">
        <button onClick={() => clipboard.writeText(clipping.content)}>
          → Clipboard
        </button>
        <button
          className="remove-clipping"
          onClick={() => onRemove(clipping.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
};

const CopyFromClipboard = ({ onCopy }) => {
  return (
    <header className="controls">
      <button id="copy-from-clipboard" onClick={onCopy}>
        Copy from Clipboard
      </button>
    </header>
  );
};

render(
  <Application firstName="Steve" />,
  document.getElementById('application'),
);
