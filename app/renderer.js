import React, { Component } from 'react';
import { render } from 'react-dom';
import { ENETDOWN } from 'constants';

class Application extends Component {
  state = {
    newClipping: '',
    clippings: [],
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const clipping = {
      id: Date.now(),
      content: this.state.newClipping,
    }
    const clippings = this.state.clippings.concat(clipping);
    this.setState({
      clippings,
      newClipping: '',
    });
  }

  render() {
    const { newClipping, clippings } = this.state;
    return (
      <section className="content">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="New Clipping" value={newClipping} name="newClipping" onChange={this.handleChange} />
        </form>
        <div>
          {clippings.map(clipping => <li key={clipping.id}>{clipping.content}</li>)}
        </div>
      </section>
    )
  }
}

class Counter extends Component {
  render() {
    return <p>Count: {this.props.count}</p>
  }
}

class CounterControls extends Component {
  render() {
    return (
    <div>
      <button onClick={this.props.increment}>+</button>
      <button onClick={this.props.decrement}>-</button>
    </div>
    )
  }
}

render(<Application firstName="Steve" />, document.getElementById('application'));
