import React, { Component } from 'react';
import { render } from 'react-dom';

class Application extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  decrement() {
    this.setState({
      count: this.state.count - 1,
    });
  }

  render() {
    return (
      <section>
        <Counter count={this.state.count} />
        <Counter count={this.state.count} />
        <Counter count={this.state.count} />
        <Counter count={this.state.count} />
        <Counter count={this.state.count} />
        <Counter count={this.state.count} />
        <Counter count={this.state.count} />
        <CounterControls increment={this.increment} decrement={this.decrement} />
        <CounterControls increment={this.increment} decrement={this.decrement} />
        <CounterControls increment={this.increment} decrement={this.decrement} />
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
