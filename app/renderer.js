import React, { Component } from 'react';
import { render } from 'react-dom';

class Application extends Component {
  state = {
    newClipping: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { newClipping } = this.state;
    return (
      <section className="content">
        <input type="text" placeholder="New Clipping" value={newClipping} name="newClipping" onChange={this.handleChange} />
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
