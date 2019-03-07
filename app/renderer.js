import React, { Component } from 'react';
import { render } from 'react-dom';

class Application extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <section>
        <p>Count: {this.state.count}</p>
        <div>
          <button onClick={this.increment}>+</button>
        </div>
      </section>
    )
  }
}

render(<Application firstName="Steve" />, document.getElementById('application'));
