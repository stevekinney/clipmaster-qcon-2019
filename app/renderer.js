import { clipboard } from 'electron';
import React, { Component } from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';

import Clippings from './containers/ClippingsContainer';

const store = createStore(reducer);

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
        <Clippings />
      </section>
    );
  }
}

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
  <Provider store={store}>
    <Application firstName="Steve" />
  </Provider>,
  document.getElementById('application'),
);
