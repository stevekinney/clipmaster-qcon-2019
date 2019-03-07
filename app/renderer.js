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
    const clippings = [...this.state.clippings, clipping];
    this.setState({
      clippings,
      newClipping: '',
    });
  }

  render() {
    const { newClipping, clippings } = this.state;
    return (
      <section className="content">
        <form className="new-clipping" onSubmit={this.handleSubmit}>
          <input type="text" className="new-clipping-content" placeholder="New Clipping" value={newClipping} name="newClipping" onChange={this.handleChange} />
        </form>
        <div className="clippings-list">
          {clippings.map(clipping => {
            return (
              <article className="clippings-list-item" key={clipping.id}>
                <div className="clipping-text" disabled>
                  {clipping.content}
                </div>
              </article>
            )
          })}
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
