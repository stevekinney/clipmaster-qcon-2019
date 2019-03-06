# Clipmaster 9000

<!-- vscode-markdown-toc -->
* 1. [Follow Along Notes](#FollowAlongNotes)
	* 1.1. [Getting the Renderer Process Set Up](#GettingtheRendererProcessSetUp)
	* 1.2. [Pulling in React](#PullinginReact)
	* 1.3. [Using JSX](#UsingJSX)
	* 1.4. [Using Props](#UsingProps)
	* 1.5. [Working with State](#WorkingwithState)
		* 1.5.1. [Implementing a Counter](#ImplementingaCounter)
	* 1.6. [Using Child Components](#UsingChildComponents)
	* 1.7. [Passing Actions in as Props](#PassingActionsinasProps)
	* 1.8. [Working with Inputs and Immutable State](#WorkingwithInputsandImmutableState)
		* 1.8.1. [Adding a Form Element](#AddingaFormElement)
		* 1.8.2. [Preventing a Browser Form Submission](#PreventingaBrowserFormSubmission)
		* 1.8.3. [Clearing Out the Form Data](#ClearingOuttheFormData)
		* 1.8.4. [Creating Unique Keys](#CreatingUniqueKeys)
		* 1.8.5. [A Quick Refactor Using the Spread Operator](#AQuickRefactorUsingtheSpreadOperator)
	* 1.9. [Styling a React Application](#StylingaReactApplication)
		* 1.9.1. [Refactoring the Clippings List](#RefactoringtheClippingsList)
	* 1.10. [Removing a Clipping](#RemovingaClipping)
	* 1.11. [Using Electron to Read from the Clipboard](#UsingElectrontoReadfromtheClipboard)
	* 1.12. [Introducing Redux](#IntroducingRedux)
		* 1.12.1. [reducer.js](#reducer.js)
		* 1.12.2. [ClippingContainer.js](#ClippingContainer.js)
		* 1.12.3. [Clipping.js](#Clipping.js)
		* 1.12.4. [ClippingsContainer.js](#ClippingsContainer.js)
		* 1.12.5. [Clippings.js](#Clippings.js)
		* 1.12.6. [CopyFromClipboardContainer.js](#CopyFromClipboardContainer.js)
		* 1.12.7. [CopyFromClipboard.js](#CopyFromClipboard.js)
		* 1.12.8. [NewClippingContainer.js](#NewClippingContainer.js)
	* 1.13. [NewClipping.js](#NewClipping.js)
		* 1.13.1. [renderer.js](#renderer.js)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='FollowAlongNotes'></a>Follow Along Notes

###  1.1. <a name='GettingtheRendererProcessSetUp'></a>Getting the Renderer Process Set Up

We're using Jade really just to see `electron-compile` in action.

```jade
doctype html
html
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width,initial-scale=1')
    meta(http-equiv='Content-Security-Policy', content="default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src *;")
    title Clipmaster 9000
    link(rel='stylesheet', href='style.css')
  body
    #application
    script.
      require('./renderer');
```

###  1.2. <a name='PullinginReact'></a>Pulling in React

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
```

Let's set up our very first component.

```js
class Application extends Component {
  render() {
    return React.createElement('h1', {}, 'Hello World');
  }
}

render(React.createElement(Application), document.getElementById('application'));
```

`React.createElement` takes three arguments: the type of element you want to create, any `props` (a.k.a. attributes), and the child nodes.

Child nodes can be strings or additional React elements.

###  1.3. <a name='UsingJSX'></a>Using JSX

`electron-compile` includes Babel out of the box. Babel can be used to take our code and transpile it before it's run in our Electron application. We can run our code through a JSX transpiler to use a more convenient syntax in our React applications.

```js
class Application extends Component {
  render() {
    return <h1>Hello World</h1>;
  }
}
```

Much cleaner, right?

###  1.4. <a name='UsingProps'></a>Using Props

Right now our application doesn't much that it couldn't do with just plain-old HTML.

Let's add a prop to our `Application` component.

```js
class Application extends Component {
  render() {
    const { name } = this.props;
    return <h1>Hello {name}!</h1>;
  }
}

render(<Application name="QCon" />, document.getElementById('application'));
```

We've come across two things here:

- We've learned how to pass props to a component.
- We've learned how to interpolate values in JSX.

After it's run through Babel, it should look something like this:

```js
class Application extends Component {
  render() {
    const {
      name
    } = this.props;
    return React.createElement("h1", null, "Hello ", name, "!");
  }

}

render(React.createElement(Application, {
  name: "QCon"
}), document.getElementById('application'));
```

If you look at this code, you'll also get a better sense of what props look lilke in normal React.

###  1.5. <a name='WorkingwithState'></a>Working with State

Components can also hold their own state, which they can modify.

```js
class Application extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }

  render() {
    const { name } = this.props;
    const { count } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <p>Count: {count}</p>
      </section>
    );
  }
}
```

####  1.5.1. <a name='ImplementingaCounter'></a>Implementing a Counter

Here is a first pass at implementing a counter. I'm going to implement the ability to increment and then I'll give you a few quick minutes to implement the ability to decrement the counter, which will be pretty similar.

```js
class Application extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }

    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  incrementCount() {
    this.setState({ count: this.state.count + 1 })
  }

  decrementCount() {
    this.setState({ count: this.state.count - 1 })
  }

  render() {
    const { name } = this.props;
    const { count } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <p>Count: {count}</p>
        <div>
          <button onClick={this.incrementCount}>+</button>
          <button onClick={this.decrementCount}>-</button>
        </div>
      </section>
    );
  }
}
```

We can use the newer class properties syntax to clean this up a bit.

```js
class Application extends Component {
  state = { count: 0 };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrementCount = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    const { name } = this.props;
    const { count } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <p>Count: {count}</p>
        <div>
          <button onClick={this.incrementCount}>+</button>
          <button onClick={this.decrementCount}>-</button>
        </div>
      </section>
    );
  }
}
```

###  1.6. <a name='UsingChildComponents'></a>Using Child Components

One component's state can be another component's prop. We'll demonstrate this using a super simple `<Counter>` component.

```js
class Counter extends Component {
  render() {
    const { count } = this.props;
    return <p>Count: {count}</p>;
  }
}
```

And we'll make the following changes to `<Application>` just to make a point:

```js
class Application extends Component {
  state = { count: 0 };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrementCount = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    const { name } = this.props;
    const { count } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <Counter count={count} />
        <Counter count={count} />
        <Counter count={count} />
        <Counter count={count} />
        <div>
          <button onClick={this.incrementCount}>+</button>
          <button onClick={this.decrementCount}>-</button>
        </div>
      </section>
    );
  }
}
```

###  1.7. <a name='PassingActionsinasProps'></a>Passing Actions in as Props

Not only can you pass data into React, you can also pass in actions that will change the state of a another compoment higher up the tree.

```js
class IncrementControls extends Component {
  render() {
    const { increment, decrement } = this.props;
    return (
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    );
  }
}
```

Then in `<Application />`:

```js
class Application extends Component {
  state = { count: 0 };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrementCount = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    const { name } = this.props;
    const { count } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <Counter count={count} />
        <Counter count={count} />
        <Counter count={count} />
        <Counter count={count} />
        <IncrementControls
          increment={this.incrementCount}
          decrement={this.decrementCount}
        />
      </section>
    );
  }
}
```

Now you're beginning to see the magic of composing UIs with React!

###  1.8. <a name='WorkingwithInputsandImmutableState'></a>Working with Inputs and Immutable State

We're about 80% of the way to "enough React to be dangerous."

Form inputs add a little bit of a challenge to the whole "pass in immutable props" thing. Let's talk through the following code.

Let's say we want to create an input field for creating a new clipping.

We could start with something like this:

```js
class Application extends Component {
  render() {
    const { name } = this.props;
    const { newClipping } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <input type="text" placeholder="New Clipping" />
      </section>
    );
  }
}
```

This code is problematic because we have no way to get at the value of the input. What if we stored it in state?

```js
class Application extends Component {
  state = {
    newClipping: '',
  }

  render() {
    const { name } = this.props;
    const { newClipping } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <input type="text" placeholder="New Clipping" value={newClipping} />
      </section>
    );
  }
}
```

This doesn't work and astute observers will notice that there is a console error.

```js
class Application extends Component {
  state = {
    newClipping: '',
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ newClipping: value });
  };

  render() {
    const { name } = this.props;
    const { newClipping } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <input
          type="text"
          placeholder="New Clipping"
          value={newClipping}
          onChange={this.handleChange}
        />
      </section>
    );
  }
}
```

Okay, now we can see that field is changing. It's a virtuous cycle. The input fires a "change" event, which updates the state of the component, which updates the value of the input.

**Quick Experiment**: Use `.toUpperCase()` to modify the value of the input before setting state.

####  1.8.1. <a name='AddingaFormElement'></a>Adding a Form Element

```js
class Application extends Component {
  state = {
    newClipping: '',
    clippings: [],
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ newClipping: value });
  };

  handleSubmit = event => {
    const clippings = this.state.clippings.concat(this.state.newClipping);
    this.setState({ clippings });
  };

  render() {
    const { name } = this.props;
    const { newClipping, clippings } = this.state;

    return (
      <section className="content">
        <h1>Hello {name}!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="New Clipping"
            value={newClipping}
            onChange={this.handleChange}
          />
        </form>
        <ul>
          {clippings.map(clipping => <li>{clipping}</li>)}
        </ul>
      </section>
    );
  }
}
```

This has _a bunch_ of problems:

- The page refreshes on each form submit.
- We don't clear out the input.
- We get a warning from React about not having a `key` on the list items.

We'll address each of these.

####  1.8.2. <a name='PreventingaBrowserFormSubmission'></a>Preventing a Browser Form Submission

```js
handleSubmit = event => {
  event.preventDefault();
  const clippings = this.state.clippings.concat(this.state.newClipping);
  this.setState({ clippings });
};
```

####  1.8.3. <a name='ClearingOuttheFormData'></a>Clearing Out the Form Data

```js
handleSubmit = event => {
  event.preventDefault();
  const clippings = this.state.clippings.concat(this.state.newClipping);
  this.setState({ clippings, newClipping: '' });
};
```

####  1.8.4. <a name='CreatingUniqueKeys'></a>Creating Unique Keys

```js
handleSubmit = event => {
  event.preventDefault();
  const clipping = {
    id: Date.now(),
    content: this.state.newClipping,
  }
  const clippings = this.state.clippings.concat(clipping);
  this.setState({ clippings, newClipping: '' });
};
```

```js
<ul>
  {clippings.map(clipping => <li key={clipping.id}>{clipping.content}</li>)}
</ul>
```

####  1.8.5. <a name='AQuickRefactorUsingtheSpreadOperator'></a>A Quick Refactor Using the Spread Operator

```js
const clippings = [...this.state.clippings, clipping];
```

###  1.9. <a name='StylingaReactApplication'></a>Styling a React Application

There are a lot of ways to style a React application. This can be an intense topic and we have limited time together, so we're going to use traditional CSS.

We'll refactor out or form slightly:

```js
<form className="new-clipping" onSubmit={this.handleSubmit}>
  <input
    type="text"
    className="new-clipping-content"
    placeholder="New Clipping"
    value={newClipping}
    onChange={this.handleChange}
  />
  <input type="submit" value="Create" />
</form>
```

####  1.9.1. <a name='RefactoringtheClippingsList'></a>Refactoring the Clippings List

```js
<div className="clippings-list">
  {clippings.map(clipping => (
    <article key={clipping.id} className="clippings-list-item">
      <div className="clipping-text" disabled>
        {clipping.content}
      </div>
    </article>
  ))}
</div>
```

**Exercise**: This is kind of gross, can you make a `<Clipping>` component that encapulates this logic?

We should be able to get to something like this:

```js
<div className="clippings-list">
  {clippings.map(clipping => (
    <Clipping content={clipping.content} key={clipping.id} />
  ))}
</div>
```

**Extension**: Can you pull the form for creating clippings into it's own component?

Ideally, we'd like to get something like this:

```js
<section className="content">
  <NewClippingForm
    value={newClipping}
    onChange={this.handleChange}
    onSubmit={this.handleSubmit}
  />
  <div className="clippings-list">
    {clippings.map(clipping => (
      <Clipping content={clipping.content} key={clipping.id} />
    ))}
  </div>
</section>
```

###  1.10. <a name='RemovingaClipping'></a>Removing a Clipping

Let's add some markup for buttons onto the `<Clipping />` component.

```js
<article className="clippings-list-item">
    <div className="clipping-text" disabled>
      {content}
    </div>
    <div className="clipping-controls">
      <button className="remove-clipping">Remove</button>
    </div>
  </article>
```

**Exercise**: Can you remove the clipping from the array?

###  1.11. <a name='UsingElectrontoReadfromtheClipboard'></a>Using Electron to Read from the Clipboard

We'll start by adding the following markup to our `<Application />` component.

```js
<header className="controls">
  <button id="copy-from-clipboard" onClick={this.addClipping}>
    Copy from Clipboard
  </button>
</header>
```

We'll need to import Electron's `clipboard` module.

```js
import { clipboard } from 'electron';
```

Finally, we can add an additional method for `addClipping`.

```js
addClipping = () => {
  const { clippings } = this.state;

  const content = clipboard.readText();
  const id = Date.now();

  const clipping = { id, content };

  this.setState({
    clippings: [clipping, ...clippings],
  });
};
```

**Exercise**: Implement the ability to write a clipping back to the clipboard.

###  1.12. <a name='IntroducingRedux'></a>Introducing Redux

```js
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

const store = createStore(reducers);
```

We'll also create a really simple reducer:

```js
const initialState = {
  1: {
    content: 'Welcome to QCon',
  },
  2: {
    content: 'https://bit.ly/very-secret',
  },
  3: {
    content: 'Lorem ipsum…',
  },
};

export default (state = initialState, action) => {
  console.log(action);

  return state;
};
```

####  1.12.1. <a name='reducer.js'></a>reducer.js

```js
const initialState = {
  1: {
    content: 'Welcome to QCon',
  },
  2: {
    content: 'https://bit.ly/very-secret',
  },
  3: {
    content: 'Lorem ipsum…',
  },
};

export default (state = initialState, action) => {

  if (action.type === 'ADD_CLIPPING') {
    const clipping = { content: action.content };
    return { ...state, [action.id]: clipping };
  }

  if (action.type === 'REMOVE_CLIPPING') {
    const newState = { ...state };
    delete newState[action.id];
    return newState;
  }

  return state;
};
```

####  1.12.2. <a name='ClippingContainer.js'></a>ClippingContainer.js

```js
import { connect } from 'react-redux';
import Clipping from '../components/Clipping';

const mapStateToProps = (state, ownProps) => {
  return state[ownProps.id];
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove() {
    dispatch({
      type: 'REMOVE_CLIPPING',
      id: ownProps.id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Clipping);
```

####  1.12.3. <a name='Clipping.js'></a>Clipping.js

```js
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
```

####  1.12.4. <a name='ClippingsContainer.js'></a>ClippingsContainer.js

```js
import { connect } from 'react-redux';
import Clippings from '../components/Clippings';

const mapStateToProps = (state) => {
  return { ids: Object.keys(state) };
};

export default connect(mapStateToProps)(Clippings);
```

####  1.12.5. <a name='Clippings.js'></a>Clippings.js

```js
import React from 'react';
import ClippingContainer from '../Containers/ClippingContainer';

const Clippings = ({ ids }) => {
  return (
    <div className="clippings-list">
      {ids.map(id => (
        <ClippingContainer key={id} id={id} />
      ))}
    </div>
  );
};

export default Clippings;
```

####  1.12.6. <a name='CopyFromClipboardContainer.js'></a>CopyFromClipboardContainer.js

```js
import { clipboard } from 'electron';
import { connect } from 'react-redux';

import CopyFromClipboard from '../components/CopyFromClipboard';

const mapDispatchToProps = dispatch => ({
  copyFromClipboard() {
    const content = clipboard.readText();
    const id = Date.now();

    dispatch({
      type: 'ADD_CLIPPING',
      content,
      id,
    });
  },
});

export default connect(null, mapDispatchToProps)(CopyFromClipboard);
```

####  1.12.7. <a name='CopyFromClipboard.js'></a>CopyFromClipboard.js

```js
import React from 'react';

const CopyFromClipboard = ({ copyFromClipboard }) => {
  return (
    <header className="controls">
      <button id="copy-from-clipboard" onClick={copyFromClipboard}>
        Copy from Clipboard
      </button>
    </header>
  );
};

export default CopyFromClipboard;
```

####  1.12.8. <a name='NewClippingContainer.js'></a>NewClippingContainer.js

```js
import { connect } from 'react-redux';

import NewClipping from '../components/NewClipping';

const mapDispatchToProps = dispatch => ({
  addClipping(event, content) {
    event.preventDefault();

    const id = Date.now();

    dispatch({
      type: 'ADD_CLIPPING',
      content,
      id,
    });
  },
});

export default connect(null, mapDispatchToProps)(NewClipping);
```

###  1.13. <a name='NewClipping.js'></a>NewClipping.js

```js
import React, { useState } from 'react';

const NewClippingForm = ({ addClipping }) => {
  const [value, setValue] = useState('');

  return (
    <form className="new-clipping" onSubmit={(event) => addClipping(event, value)}>
      <input
        type="text"
        className="new-clipping-content"
        placeholder="New Clipping"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
};

export default NewClippingForm;
```

####  1.13.1. <a name='renderer.js'></a>renderer.js

```js
import React, { Component } from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

const store = createStore(reducers);

import CopyFromClipboard from './Containers/CopyFromClipboardContainer';
import Clippings from './Containers/ClippingsContainer';
import NewClipping from './Containers/NewClippingContainer';

class Application extends Component {
  render() {
    return (
      <section className="content">
        <CopyFromClipboard />
        <NewClipping />
        <Clippings />
      </section>
    );
  }
}

render(
  <Provider store={store}><Application /></Provider>,
  document.getElementById('application'),
);
```
