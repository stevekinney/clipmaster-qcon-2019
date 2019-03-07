import omit from 'lodash/omit';

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
    return omit(state, action.id);
  }

  return state;
}
